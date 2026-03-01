import { XMLParser } from 'fast-xml-parser';
import { TorznabAttr } from './torznab-attr.interface';
import { TorznabItem } from './torznab-item.class';
import { Logger } from '@nestjs/common';

export class JacketError extends Error { }

export class TorznabParser {
  private logger = new Logger(TorznabParser.name);
  torznab: object;

  constructor(torznab: object) {
    this.torznab = torznab;
  }

  selectTorrent(): string {
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(this.torznab);
    if (json['error']) {
      throw new JacketError(json['error']['@_description']);
    }
    if (!json['rss']['channel']['item']) {
      throw new JacketError('no content found');
    }
    let items: TorznabItem[] = json.rss.channel.item.map((item: object): TorznabItem => {
      return new TorznabItem(
        item['title'],
        item['size'],
        this.parseTorznabAttrs(item['torznab:attr'])
      );
    });
    const sorted = items.sort((a: TorznabItem, b: TorznabItem): number => {
      const deltaSize = a.size - b.size;
      const deltaSeeders = a.getSeeders() - b.getSeeders();

      if (deltaSize === 0) {
        if (deltaSeeders === 0)
          return 0;
        if (deltaSeeders < 0)
          return 1;
        if (deltaSeeders > 0)
          return -1;
      }
      if (deltaSize < 0) {
        if (deltaSeeders >= 0 || a.getSeeders() >= 50)
          return -1;
        return 1;
      }
      if (deltaSize > 0) {
        if (deltaSeeders <= 0 || b.getSeeders() >= 50)
          return 1;
        return -1;
      }
    });
    this.logger.log(`selected torrent with ${sorted[0].getSeeders()} seeders`);
    return sorted[0].getMagnet()
  }

  parseTorznabAttrs(torznabAttrs: object[]): TorznabAttr[] {
    return torznabAttrs.map((attr: object): TorznabAttr => {
      return <TorznabAttr>{
        name: attr['@_name'],
        value: attr['@_value'],
      };
    });
  }
}

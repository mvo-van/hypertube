import { XMLParser } from 'fast-xml-parser';
import { TorznabAttr } from './torznab.interface';

export class JacketError extends Error {}

export class TorznabParser {
  torznab: object;

  constructor(torznab: object) {
    this.torznab = torznab;
  }

  selectTorrent(): string {
    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const json = parser.parse(this.torznab);
    if (json['error']) {
      throw new JacketError(json['error']['@_description']);
    }
    if (!json['rss']['channel']['item']) {
      throw new JacketError('no content found');
    }
    let items = json.rss.channel.item;
    items = items.map((item) => this.parseTorznabAttrs(item['torznab:attr']));
    // TODO: MAXIMISER LE NOMBRE DE SEEDERS
    
    // const attrs = this.parseTorznabAttrs(item['torznab:attr']);

    // const magnet = attrs.find((attr: TorznabAttr) => attr.name == 'magneturl');

    // return magnet.value;
    return this.getMagnetByMaxSeeders(items);
  }

  getSeeders(attrs: TorznabAttr[]) : number {
    const seeders = attrs.find((attr: TorznabAttr) => attr.name == 'seeders');
    if (!seeders) {
      return 0;
    }
    return parseInt(seeders.value);
  }

  getMagnet(attrs: TorznabAttr[]) : string | undefined {
    return attrs.find((attr: TorznabAttr) => attr.name == 'magneturl')?.value;
  }

  getMagnetByMaxSeeders(items: TorznabAttr[][]) {
    let maxSeeders = 0;
    let selectedMagnet = '';

    for (const item of items) {
      const currentSeeders = this.getSeeders(item);
      console.log(`Current seeders: ${currentSeeders}`);
      if (currentSeeders > maxSeeders) {
        maxSeeders = currentSeeders;
        selectedMagnet = this.getMagnet(item);
      }
    }
    console.log(`Choosen seeders: ${maxSeeders}`);
    return selectedMagnet;
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

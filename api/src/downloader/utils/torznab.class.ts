import { XMLParser } from 'fast-xml-parser';

export class JacketError extends Error {}

export class TorznabParser {
  torznab: object;

  constructor(torznab: object) {
    this.torznab = torznab;
  }

  getMagnet(): string {
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
    const item = json.rss.channel.item[0];
    const attrs = this.parseTorznabAttrs(item['torznab:attr']);

    // TODO: MAXIMISER LE NOMBRE DE SEEDERS
    const magnet = attrs.find((attr: TorznabAttr) => attr.name == 'magneturl');

    return magnet.value;
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

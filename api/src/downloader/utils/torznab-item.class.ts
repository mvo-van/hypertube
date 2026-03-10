import { TorznabAttr } from "./torznab-attr.interface";

export class TorznabItem {
  constructor(
    public title: string,
    public size: number,
    public attrs: TorznabAttr[]
  ) { }

  getMagnet(): string | undefined {
    return this.attrs.find((attr: TorznabAttr) => attr.name == 'magneturl')?.value;
  }

  getSeeders(): number {
    const seeders = this.attrs.find((attr: TorznabAttr) => attr.name == 'seeders');
    if (!seeders) {
      return 0;
    }
    return parseInt(seeders.value);
  }
}
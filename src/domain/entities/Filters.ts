import Sound from './Sound';

class Filters {
  search: string;

  constructor(search: string) {
    this.search = search;
  }

  static fromFilters(filters: Filters): Filters {
    return new Filters(filters.search);
  }

  applyFilters(sounds: Sound[]): Sound[] {
    return sounds.filter(
      (sound) => this.matchSearch(sound.name) || this.matchSearch(sound.author)
    );
  }

  private matchSearch(value: string): RegExpMatchArray | boolean | null {
    if (this.search === '') return true;
    const regex = RegExp(Filters.formatString(this.search));
    return Filters.formatString(value).match(regex);
  }

  private static formatString(value: string): string {
    return value
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^\w\s.-_/%]/g, '');
  }
}

export default Filters;

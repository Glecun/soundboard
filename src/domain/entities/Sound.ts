import Source from './Source';

class Sound {
  name: string;

  author: string;

  path: string;

  source: Source;

  constructor(name: string, author: string, path: string, source: Source) {
    this.name = name;
    this.author = author;
    this.path = path;
    this.source = source;
  }
}

export default Sound;

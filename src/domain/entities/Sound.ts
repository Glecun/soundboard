import Source from './Source';

class Sound {
  name: string;

  description: string;

  path: string;

  source: Source;

  constructor(name: string, description: string, path: string, source: Source) {
    this.name = name;
    this.description = description;
    this.path = path;
    this.source = source;
  }
}

export default Sound;

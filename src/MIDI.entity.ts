export default class MIDIEntity {
  private port: number;
  private name: string;

  constructor(port: number, name: string) {
    this.port = port;
    this.name = name;
  }
}

import MIDIController from "./MIDI.controller";
import Navigator from "./Navigator";

class Main {
  static async start() {
    const navigator: Navigator = new Navigator();
    const MIDI: MIDIController = new MIDIController();

    MIDI.initiate();
    MIDI.scan();
  }
}

Main.start();

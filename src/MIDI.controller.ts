import midi, { Input } from "midi";
import MIDIEntity from "./MIDI.entity";

/**
 * A custom sync MIDI contoller.
 */
export default class MIDI {
  private input: Input | undefined;
  private list: MIDIEntity[] = [];

  /**
   * Starts the MIDI controller.
   */
  public initiate(): void {
    this.input = new midi.Input();
    process.on("exit", () => {
      this.forceClose();
    });
    this.input.on("message", (deltaTime, message) => {
      console.log(message[1]);
    });
  }

  /**
   * To do a scan and display all the available MIDI ports.
   */
  public scan(): void {
    if (!this.input) {
      console.log("Error on scan(): initiate the MIDI controller first.");
      return;
    }

    const portCount = this.input.getPortCount();

    if (!portCount) {
      return;
    }

    for (let i = 0; i < portCount; i++) {
      this.list.push(new MIDIEntity(i, this.input.getPortName(i)));
    }

    console.log("Available MIDI ports:");
    for (const MIDIItem of this.list) {
      console.log(MIDIItem);
    }

    return;
  }

  /**
   * To listen a specific port.
   *
   * @param port The port to start listening.
   */
  public listen(port: number): void {
    if (!this.input) {
      console.log("Error on scan(): initiate the MIDI controller first.");
      return;
    }

    this.input.openPort(port);
  }

  /**
   * Forces closing the MIDI controller including all his ports.
   */
  public forceClose(): void {
    if (!this.input) {
      console.log("Error on scan(): initiate the MIDI controller first.");
      return;
    }

    this.input.closePort();
  }
}

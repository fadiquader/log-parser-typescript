import {LogParserInterface} from "../../src/log-parser/log-parser.interface";
import {createLogEvent} from "./create-log-event";

export class MockJsonLogParser implements LogParserInterface {
  private _level: string
  constructor(level: string) {
    this._level = level
  }

  setLevel(level: string) {
    this._level = level
  }

  get level(): string {
    return this._level
  }
  parse(line: string): any {
    return createLogEvent({ level: this.level })
  }
}

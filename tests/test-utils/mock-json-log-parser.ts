import {LogParserInterface} from "../../src/log-parser/log-parser.interface";
import {createLogEvent} from "./create-log-event";

export class MockJsonLogParser implements LogParserInterface {
  private _logLevel: string
  constructor(logLevel: string) {
    this._logLevel = logLevel
  }

  setLogLevel(logLevel: string) {
    this._logLevel = logLevel
  }

  get logLevel(): string {
    return this._logLevel
  }
  parse(line: string): any {
    return createLogEvent({ logLevel: this._logLevel })
  }
}

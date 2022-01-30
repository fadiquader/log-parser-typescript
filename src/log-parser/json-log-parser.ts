import grokJS, { GrokPattern } from "grok-js";
import { LogParserInterface } from "./log-parser.interface";
import { InvalidJsonPatternError } from "../custom-erros/invalid-json-pattern-error";

const patterns = grokJS.loadDefaultSync();

export class JsonLogParser implements LogParserInterface {
  private readonly _pattern: GrokPattern;

  constructor(expression: string) {
    this._pattern = patterns.createPattern(expression)
  }

  parse(line: string): { [key: string]: string } {
    const log = this._pattern.parseSync(line)
    if (log === null) {
      throw new InvalidJsonPatternError(line)
    }

    return log;
  }
}

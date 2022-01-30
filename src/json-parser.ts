import grokJS, {GrokPattern} from "grok-js";
import {ParserInterface} from "./parser.interface";
import {InvalidJsonPatternError} from "./custom-erros/invalid-json-pattern-error";

const patterns = grokJS.loadDefaultSync();

export class JsonParser implements ParserInterface {
  private readonly _pattern: GrokPattern;

  constructor(expression: string) {
    this._pattern = patterns.createPattern(expression)
  }

  parse(line: string): { [key: string]: string } {
    const jsonObj = this._pattern.parseSync(line)
    if (jsonObj === null) {
      throw new InvalidJsonPatternError(line)
    }

    return jsonObj;
  }
}

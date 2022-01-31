import grokJS, { GrokPattern } from 'grok-js';
import { LogParserInterface } from './log-parser.interface';
import { InvalidJsonPatternError } from './invalid-json-pattern-error';

export class JsonLogParser implements LogParserInterface {
  private readonly _pattern: GrokPattern;

  constructor(expression: string) {
    const patterns = grokJS.loadDefaultSync();
    this._pattern = patterns.createPattern(expression)
  }

  parse(line: string): { [key: string]: string } {
    grokJS.loadDefaultSync();
    const log = this._pattern.parseSync(line)

    if (log === null) {
      throw new InvalidJsonPatternError(line)
    }

    return log;
  }
}

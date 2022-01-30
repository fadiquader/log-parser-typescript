import fs from 'fs';
import { once } from 'events';
import readline from 'readline'
import {ParserInterface} from './parser/parser.interface';
import { LogLevel} from "./utils/constants";
import {FileNotFoundError} from "./custom-erros/file-not-found-error";
import {logParserOptionsSchema} from "./utils/log-parser-options-schema";
import {Transport} from "./transports/transport";


interface LogParserOptionsInterface {
  inputFile: string;
  level: LogLevel;
  parser?: ParserInterface;
  transports: Transport[]
  formatter?(log: any): string;
}

export function createLogParser(opts: LogParserOptionsInterface) {
  const options = logParserOptionsSchema.validateSync(opts);

  if (!fs.existsSync(options.inputFile)) {
    throw new FileNotFoundError(options.inputFile)
  }

  class LogParser {
    createReadLine() {
      return readline.createInterface({
        input: fs.createReadStream(options.inputFile),
        crlfDelay: Infinity
      });
    }

    async pipe(line: string) {
      for (const transport of options.transports) {
        await transport.write(line)
      }
    }

    async closeTransports() {
      for (const transport of options.transports) {
        await transport.close()
      }
    }

    async process() {
      const rl = this.createReadLine();
      rl.on('line', async (line: string) => {
        process.stdout.write('.');
        const log = options.parser.parse(line)
        if (log.level !== options.level) return;

        await this.pipe(options.formatter(log))
      })


      await once(rl, 'close');
      await this.closeTransports()
      console.log();
    }
  }

  return new LogParser()
}

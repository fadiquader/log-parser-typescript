import fs from 'fs';
// import { once } from 'events';
import readline from 'readline'
import { LogParserInterface } from './log-parser.interface';
import { LogLevel } from "../utils/constants";
import { FileNotFoundError } from "../custom-erros/file-not-found-error";
import { logParserOptionsSchema } from "./log-parser-options-schema";
import { TransportInterface } from "../transports/transport.interface";


export interface LogParserOptionsInterface {
  inputFile: string;
  level: LogLevel;
  parser: LogParserInterface;
  transports: TransportInterface[];
  formatter?(log: any): string;
}

enum EventTypes {
  LINE = 'line',
  CLOSE = 'close',
  ERROR = 'error'
}

interface EventSubscriptions {
  [EventTypes.LINE]: Array<Function>
  [EventTypes.CLOSE]: Array<Function>
  [EventTypes.ERROR]: Array<Function>
}

export function createLogParser(opts: LogParserOptionsInterface) {
  const options = logParserOptionsSchema.validateSync(opts);

  if (!fs.existsSync(options.inputFile)) {
    throw new FileNotFoundError(options.inputFile)
  }

  class LogParser {
    started: boolean = false;
    subscriptions: EventSubscriptions
    constructor() {
      this.subscriptions = {
        [EventTypes.LINE]: [],
        [EventTypes.CLOSE]: [],
        [EventTypes.ERROR]: [],
      }
    }

    createReadLine() {
      return readline.createInterface({
        input: fs.createReadStream(options.inputFile),
        crlfDelay: Infinity
      });
    }

    on(eventName: string, callback: Function): LogParser {
      if (typeof callback !== 'function') return this;

      switch (eventName) {
        case EventTypes.LINE: {
          this.subscriptions[EventTypes.LINE].push(callback)
          break;
        }
        case EventTypes.CLOSE: {
          this.subscriptions[EventTypes.CLOSE].push(callback)
          break;
        }
        case EventTypes.ERROR: {
          this.subscriptions[EventTypes.ERROR].push(callback)
          break;
        }
      }

      return this;
    }

    // can be static
    async pipeLogEvent(line: string) {
      for (const transport of options.transports) {
        await transport.write(line)
      }
    }

    async closeTransports() {
      for (const transport of options.transports) {
        await transport.close()
      }
    }

    private emitError(error: Error) {
      this.subscriptions[EventTypes.ERROR].forEach(cb => cb(error))
    }

    start(): LogParser {
      if (this.started) return this;

      const rl = this.createReadLine();
      this.started = true;

      rl.on('line', async (line: string) => {
        process.stdout.write('.');
        try {
          const log = options.parser.parse(line)
          if (log.level !== options.level) return;
          const processedLog = options.formatter(log)
          await this.pipeLogEvent(processedLog)
          this.subscriptions[EventTypes.LINE].forEach(cb => cb(processedLog))
        } catch (error) {
          this.emitError(error)
        }
      })

      rl.on('close', async () => {
        try {
          await this.closeTransports()
          this.subscriptions[EventTypes.CLOSE].forEach(cb => cb())
        } catch(error) {
          this.emitError(error)
        }
      });

      return this;
    }
  }

  return new LogParser()
}

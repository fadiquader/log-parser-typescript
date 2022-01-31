import fs, { WriteStream } from "fs";
import { once } from 'events';
import { TransportInterface } from './transport.interface';

interface JsonLogFileOptions {
  filename: string
}
/**
 * Pipes logs into a json file as an array of objects.
 */
export class JsonLogFile implements TransportInterface {
  filename: string
  hasData: boolean = false
  outputFile: WriteStream
  constructor(opts: JsonLogFileOptions) {
    if (!opts.filename) {
      throw new Error('filename is required')
    }
    this.filename = opts.filename;
    this.outputFile = fs.createWriteStream(this.filename);
  }

  write(line: string) {
    if (this.hasData) {
      this.outputFile.write(`,\n${line}`)
    } else {
      this.outputFile.write(`[${line}`)
      this.hasData = true
    }
  }

  async close() {
    if (this.hasData) {
      this.outputFile.write(']');
    }

    this.outputFile.close();
    await once(this.outputFile, 'close');
  }
}

import fs, {WriteStream} from "fs";
import util from 'util';
import {Transport} from './transport';

export class LogJsonFile implements Transport {
  filename: string
  hasData: boolean = false
  outputFile: WriteStream
  constructor(filename: string) {
    this.filename = filename;
    this.outputFile = fs.createWriteStream(this.filename);
    util.promisify(this.outputFile.write)
  }

  async write(line: string) {
    if (this.hasData) {
      await this.outputFile.write(`, ${line}\n`)
    } else {
      await this.outputFile.write(`[\n${line}\n`)
    }
  }

  async close() {
    await this.outputFile.write(']')
    this.outputFile.close();
  }
}

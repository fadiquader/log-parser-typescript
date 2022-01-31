// import { EventEmitter } from 'events'
// import readline from 'readline'
// import fs from 'fs'
// import { Readable } from "stream";
// import { createLogParser } from "../src/log-parser";
// import { DEFAULT_JSON_PATTERN, LogLevel } from "../src/utils/constants";
// import { JsonLogParser } from "../src/log-parser/json-log-parser";
// import { LogEventFormatter } from "../src/log-event-formatter";
// import { JsonLogFile } from "../src/transports/json-log-file";
//
// jest.mock('fs')
// jest.mock('readline')
//
// jest.mock('../src/log-parser/json-log-parser')
//
// jest.mock('../src/log-event-formatter')
//
// jest.mock('../src/transports/json-log-file')
//
// describe('createLogParser Function', () => {
//
//   it('creates a LogParser', async () => {
//     let emitter: any = new EventEmitter();
//     const mockedReadStream = Readable.from([
//       'log1',
//       'log2',
//     ])
//     // mockedReadStream.emit()
//     jest.spyOn(fs, 'createReadStream').mockReturnValue(mockedReadStream as any)
//     jest.spyOn(fs, 'existsSync').mockReturnValue(true)
//
//     jest.spyOn(readline, 'createInterface').mockImplementation(() => {
//       emitter.close = () => {};
//       return emitter
//     });
//     console.log('mockedReadStream ', mockedReadStream)
//
//     //
//     const jsonLogParser = new JsonLogParser(DEFAULT_JSON_PATTERN)
//     const parser = createLogParser({
//       inputFile: 'input.log',
//       level: LogLevel.ERROR,
//       parser: jsonLogParser,
//       formatter: (log: any): string => new LogEventFormatter(log).toString(),
//       transports: [
//         new JsonLogFile({ filename: 'output.json' })
//       ],
//     });
//     console.log('parser ', parser)
//     await parser.process()
//     // // expect(parser.pipe).toHaveBeenCalledTimes(2)
//   })
// })

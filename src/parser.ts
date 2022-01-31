import commandLineArgs from 'command-line-args'
import { createLogParser } from "./log-parser";
import { JsonLogFile } from "./transports/json-log-file";
import { JsonLogParser } from "./log-parser/json-log-parser";
import { LogEventFormatter } from "./log-event-formatter";
import { DEFAULT_JSON_PATTERN, LogLevel } from "./utils/constants";

const commandLineOptions = commandLineArgs([
  { name: 'input', type: String },
  { name: 'output', type: String },
]);

const parser = createLogParser({
  inputFile: commandLineOptions.input,
  level: LogLevel.ERROR,
  parser: new JsonLogParser(DEFAULT_JSON_PATTERN),
  formatter: (log: any): string => new LogEventFormatter(log).toString(),
  transports: [
    new JsonLogFile({ filename: commandLineOptions.output })
  ],
});

const startTime = new Date().getTime();

parser.start()
  .on('close', () => {
    const diffInSeconds = (new Date().getTime() - startTime) / 1000
    console.log(`\n⏰  Done in ${diffInSeconds}s.`)
    process.exit(0)
  })
  .on('error', (err: Error) => {
    console.error('Failed: ', err)
    process.exit(0)
  });

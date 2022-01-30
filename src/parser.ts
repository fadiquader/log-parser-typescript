import commandLineArgs from 'command-line-args'
import {createLogParser} from "./create-log-parser";
import {DEFAULT_JSON_PATTERN, LogLevel} from "./utils/constants";
import {LogJsonFile} from "./transports/log-json-file";
import {JsonLogParser} from "./log-parser/json-log-parser";
import {LogEventFormatter} from "./log-event-formatter";


const commandLineOptions = commandLineArgs([
  { name: 'input', type: String },
  { name: 'output', type: String },
]);


const parser = createLogParser({
  inputFile: commandLineOptions.input || 'app.log',
  level: LogLevel.ERROR,
  parser: new JsonLogParser(DEFAULT_JSON_PATTERN),
  formatter: (log: any): string => new LogEventFormatter(log).toString(),
  transports: [
    new LogJsonFile(commandLineOptions.output || 'output.json')
  ],
});

const startTime = new Date().getTime();
parser.process()
  .then(() => {
    const diffInSeconds = (new Date().getTime() - startTime) / 1000
    console.log(`⏰  Done in ${diffInSeconds}s.`)
    process.exit(0)
  })
  .catch(_ => {
    console.error('Failed')
    process.exit(0)
  });

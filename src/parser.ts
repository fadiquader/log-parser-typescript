import commandLineArgs from 'command-line-args'
import {createLogParser} from "./create-log-parser";
import {LogLevel} from "./utils/constants";
import {LogJsonFile} from "./transports/log-json-file";


const commandLineOptions = commandLineArgs([
  { name: 'input', type: String },
  { name: 'output', type: String },
]);


const parser = createLogParser({
  inputFile: commandLineOptions.input || 'app.log',
  level: LogLevel.ERROR,
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
  .catch(() => {
    console.error('Failed')
    process.exit(0)
  });

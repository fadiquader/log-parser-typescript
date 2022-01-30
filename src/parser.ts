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

parser.processLineByLine()
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch(() => {
    process.exit(0)
  })

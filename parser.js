define("index", ["require", "exports", "fs", "readline", "command-line-args", "grok-js"], function (require, exports, fs, readline, command_line_args_1, grok_js_1) {
    "use strict";
    exports.__esModule = true;
    var patterns = (0, grok_js_1.loadDefaultSync)();
    var p2 = '%{TIMESTAMP_ISO8601:timestamp} - %{LOGLEVEL:level} - %{GREEDYDATA:payload}';
    var commandLineOptions = (0, command_line_args_1["default"])([
        { name: 'input', type: String },
        { name: 'output', type: String },
    ]);
    var rl = readline.createInterface({
        input: fs.createReadStream(commandLineOptions.input || 'app.log'),
        crlfDelay: Infinity
    });
    rl.on('line', function (line) {
        var pattern = patterns.createPattern(p2);
        var patternf = pattern.parseSync(line);
        console.log('patternf ', patternf);
        // console.log(`Line from file: ${line}`);
    });
    rl.on('close', function () {
        console.log('Done');
        process.exit(0);
    });
    console.log(commandLineOptions);
});

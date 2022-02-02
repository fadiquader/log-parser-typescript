import { JsonLogParser } from "../src/log-parser/json-log-parser";
import { InvalidJsonPatternError } from "../src/log-parser/invalid-json-pattern-error";
import { DEFAULT_JSON_PATTERN } from "../src/utils/constants";

const logStr = '2022-08-09T02:12:51.259Z - error - ' +
  '{"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e979",' +
  '"details":"Cannot find user orders list","code": 404,"err":"Not found"}';

describe('JsonLogParser class', () => {
  it('parses string to json', () => {
    const jsonLogParser: JsonLogParser = new JsonLogParser(DEFAULT_JSON_PATTERN)
    const logObj = jsonLogParser.parse(logStr)
    expect(logObj.timestamp).toMatch('2022-08-09T02:12:51.259Z')
    expect(logObj.logLevel).toMatch('error')
    expect(logObj.data).toEqual(
      '{"transactionId":"9abc55b2-807b-4361-9dbe-aa88b1b2e979",' +
      '"details":"Cannot find user orders list","code": 404,"err":"Not found"}'
    )
  })

  it('throws error when invalid pattern provided', () => {
    const jsonLogParser: JsonLogParser = new JsonLogParser('%{TIMESTAMP_ISO8701:timestamp}')
    expect(() => jsonLogParser.parse(logStr)).toThrow(new InvalidJsonPatternError(logStr))
  })
})

import * as yup from "yup";
import {DEFAULT_JSON_PATTERN, LogLevel} from "./constants";
import {JsonParser} from "../json-parser";
import {LogEventFormatter} from "../log-event-formatter";

export const logParserOptionsSchema = yup.object({
  inputFile: yup.string().required(),
  level: yup.string().oneOf(Object.values(LogLevel)).required(),
  parser: yup.mixed().nullable(false).default(new JsonParser(DEFAULT_JSON_PATTERN)),
  formatter: yup.mixed().nullable(false).default(() => {
    return (log: any): string => (new LogEventFormatter(log)).toString()
  }),
  transports: yup.array().default([])
})

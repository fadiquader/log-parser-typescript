import * as yup from "yup";
import {LogLevel} from "./constants";

export const logParserOptionsSchema = yup.object({
  inputFile: yup.string().required(),
  level: yup.string().oneOf(Object.values(LogLevel)).required(),
  parser: yup.mixed().required(),
  formatter: yup.mixed().required(),
  transports: yup.array().default([])
})

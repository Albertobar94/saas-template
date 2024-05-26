import { Logger } from "tslog";
import { config } from "./config";
import { Levels } from "./enums";

const logger = new Logger(config);

export { type Logger, Levels, logger };

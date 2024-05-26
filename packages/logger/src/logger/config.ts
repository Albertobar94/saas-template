import { type ISettingsParam } from "tslog";
import { AppEnvironments, NodeEnvs } from "@module/shared/constants";
// Because of this import, there's a requirement for turbo to use the app env file
// import { env } from "@module/shared/server-env";
import { Levels } from "./enums";

export const config: ISettingsParam<unknown> = {
  name: "@Repo", // TODO: add env var
  maskValuesOfKeys: ["password", "passwordConfirmation", "credentials", "credential"],
  // type:
  //   env.NODE_ENV === NodeEnvs.Test
  //     ? "hidden"
  //     : env.APP_ENV === AppEnvironments.Local
  //       ? "pretty"
  //       : "json",
  // minLevel: env.APP_ENV === AppEnvironments.Local ? Levels.Debug : Levels.Info,
  // prettyLogTimeZone: env.APP_ENV === AppEnvironments.Production ? "UTC" : "local",
  // hideLogPositionForProduction: env.APP_ENV === AppEnvironments.Production,
  prettyErrorStackTemplate: "  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}", // default
  prettyErrorTemplate: "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}", // default
  prettyLogTemplate: "{{logLevelName}} {{rawIsoStr}} {{name}} - ", // default with exclusion of `{{filePathWithLine}}`
  stylePrettyLogs: true,
  prettyLogStyles: {
    logLevelName: {
      "*": ["bold", "black", "bgWhiteBright", "dim"],
      SILLY: ["bold", "purple"],
      TRACE: ["bold", "purple"],
      DEBUG: ["bold", "purple"],
      INFO: ["bold", "green"],
      WARN: ["bold", "yellow"],
      ERROR: ["bold", "red"],
      FATAL: ["bold", "redBright"],
    },
    dateIsoStr: "white",
    filePathWithLine: "white",
    name: ["blue", "bold"],
    nameWithDelimiterPrefix: ["white", "bold"],
    nameWithDelimiterSuffix: ["white", "bold"],
    errorName: ["bold", "bgRedBright", "whiteBright"],
    fileName: ["yellow"],
  },
};

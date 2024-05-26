import sharedConfig from "@package/config/tailwind.config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "prefix" | "presets"> = {
  presets: [sharedConfig],
};

export default config;

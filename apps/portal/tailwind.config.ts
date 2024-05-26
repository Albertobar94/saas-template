// tailwind config is required for editor support
import type { Config } from "tailwindcss";
import sharedConfig from "@package/config/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: ["./src/**/*.{tsx,mdx}", "../../modules/ui/src/**/*{.js,.ts,.jsx,.tsx}"],
    },
  ],
};

export default config;

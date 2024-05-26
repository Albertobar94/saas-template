"use client";

import GoogleAnalyticsPlugin from "@analytics/google-analytics";
import MixpanelPlugin from "@analytics/mixpanel";
import { Analytics } from "analytics";
import { env } from "@module/shared/client-env";
import { AppEnvironments } from "@module/shared/constants";

export const analytics = Analytics({
  app: "@package/analytics",
  debug: env.APP_ENV === AppEnvironments.Local,
  plugins: [
    MixpanelPlugin({
      token: env.MIXPANEL_TOKEN,
      options: {
        api_host: env.MIXPANEL_API,
        autotrack: true,
        cross_subdomain_cookie: true,
        persistence: "cookie",
        // persistence_name: "",
        // cookie_name: "",
        store_google: true,
        save_referrer: true,
        test: env.APP_ENV !== AppEnvironments.Production,
        verbose: env.APP_ENV === AppEnvironments.Local,
        img: false,
        track_pageview: true,
        debug: env.APP_ENV === AppEnvironments.Local,
        track_links_timeout: 300,
        cookie_expiration: 365,
        upgrade: false,
        disable_persistence: false,
        disable_cookie: false,
        secure_cookie: false,
        ip: true,
      },
      // Ref: https://github.com/DavidWells/analytics/issues/370
      pageEvent: "page_view",
    }),
    GoogleAnalyticsPlugin({
      measurementIds: [env.GOOGLE_ANALYTICS_ID],
    }),
  ],
});

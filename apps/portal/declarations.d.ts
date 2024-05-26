// Duplicated filed required in this folder for Next.js to build successfully
// Source: @package/analytics

declare module "@analytics/mixpanel" {
  export interface MixpanelInitOptions {
    api_host?: string;
    app_host?: string;
    autotrack?: boolean;
    cdn?: string;
    cross_subdomain_cookie?: boolean;
    persistence?: string;
    persistence_name?: string;
    cookie_name?: string;
    loaded?: () => void;
    store_google?: boolean;
    save_referrer?: boolean;
    test?: boolean;
    verbose?: boolean;
    img?: boolean;
    track_pageview?: boolean;
    debug?: boolean;
    track_links_timeout?: number;
    cookie_expiration?: number;
    upgrade?: boolean;
    disable_persistence?: boolean;
    disable_cookie?: boolean;
    secure_cookie?: boolean;
    ip?: boolean;
    property_blacklist?: string[];
  }

  export interface MixpanelPluginOptions {
    token: string;
    options?: MixpanelInitOptions;
    pageEvent?: string;
    customScriptSrc?: string;
  }

  export interface MixpanelPlugin extends Record<string, unknown> {
    name: string;
    config: MixpanelPluginOptions;
    identify: (payload: { userId: string; traits: unknown }) => void;
    page: (payload: { properties: { path: string; [key: string]: unknown } }) => void;
    track: (payload: { event: string; properties: Record<string, unknown> }) => void;
    loaded: () => boolean;
    reset: () => void;
    methods: {
      alias: (alias: string, original: string) => void;
    };
  }

  export default function mixpanelPlugin(options: MixpanelPluginOptions): MixpanelPlugin;
}

declare module "@analytics/google-analytics" {
  interface GtagConfig {
    anonymize_ip?: boolean;
    cookie_domain?: string;
    cookie_expires?: number;
    cookie_prefix?: string;
    cookie_update?: boolean;
    cookie_flags?: string;
  }

  interface GoogleAnalyticsPluginOptions {
    measurementIds: string[];
    debug?: boolean;
    dataLayerName?: string;
    gtagName?: string;
    gtagConfig?: GtagConfig;
    customScriptSrc?: string;
  }

  export default function googleAnalyticsPlugin(
    options: GoogleAnalyticsPluginOptions,
  ): Record<string, unknown>;
}

// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import { httpClientIntegration } from "@sentry/integrations";
import * as Integrations from "@sentry/integrations";
import {
  BrowserClient,
  BrowserProfilingIntegration,
  breadcrumbsIntegration,
  dedupeIntegration,
  defaultStackParser,
  feedbackIntegration,
  httpContextIntegration,
  linkedErrorsIntegration,
  makeFetchTransport,
  setCurrentClient,
} from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import { env } from "@module/shared/client-env";
import { AppEnvironments } from "@module/shared/constants";
import packageJson from "./package.json";

export const sentryClientConfig: Sentry.BrowserOptions = {
  dsn: env.SENTRY_DSN,
  enabled:
    env.APP_ENV === AppEnvironments.Development ||
    env.APP_ENV === AppEnvironments.Staging ||
    env.APP_ENV === AppEnvironments.Production,
  release: `@portal-${env.APP_ENV}-${packageJson.version}`,
  initialScope: {
    tags: {
      service: `@portal-${env.APP_ENV}`,
    },
  },

  // Replay may only be enabled for the client-side
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
    new Sentry.BrowserProfilingIntegration(),
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
    Integrations.httpClientIntegration(),
  ],

  // You will need to configure your web server CORS to allow the sentry-trace and baggage headers.
  // The configuration might look like "Access-Control-Allow-Headers: sentry-trace" and "Access-Control-Allow-Headers: baggage",
  // but it depends on your set up. If you do not allow the two headers, the request might be blocked.
  // For client-side you might have to define tracePropagationTargets to get around possible Browser CORS
  tracePropagationTargets: [
    // /^https:\/\/[YOUR APP NAME HERE]-(development|staging|production)\.vercel\.app\/$/,
    env.APP_ENV === AppEnvironments.Local ? /^http:\/\/localhost:3001\/$/ : "",
  ],

  // Queue events using the browsers' IndexedDB storage. Once your application comes back online, all events will be sent together.
  transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  beforeSend(event) {
    if (event.request?.headers?.authorization) delete event.request.headers.authorization;

    return event;
  },
};

// This creates a custom Sentry Client with minimal integrations
export const sentryClient = new BrowserClient({
  // Provide Sentry's Secret Key
  dsn: sentryClientConfig.dsn,
  // Provide Sentry's Release Version
  release: sentryClientConfig.release,
  // Provide Sentry's Initial Scope
  initialScope: sentryClientConfig.initialScope,
  // Enable Sentry only in Production, Staging, or Development
  enabled: sentryClientConfig.enabled,
  // Sentry's Error Transport Mechanism
  transport: makeFetchTransport,
  // Sentry's Stack Trace Parser
  stackParser: defaultStackParser,
  // All supported Integrations by us
  integrations: [
    dedupeIntegration(),
    httpContextIntegration(),
    breadcrumbsIntegration(),
    linkedErrorsIntegration(),
    new BrowserProfilingIntegration(),
    feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
    httpClientIntegration(),
  ],
  // We only want to allow ingestion from these pre-selected allowed URLs
  // Note that the vercel.app prefix is for our Pull Request Branch Previews
  allowUrls: [/^https:\/\/.+\.vercel\.app/], // Your URLs here
  // Percentage of events to send to Sentry (1% of them) (for performance metrics)
  tracesSampleRate: sentryClientConfig.tracesSampleRate,
  // Percentage of events to send to Sentry (1% of them) (for session replays)
  replaysSessionSampleRate: sentryClientConfig.replaysSessionSampleRate,
  // Percentage of events to send to Sentry (1% of them) (for session replays when error happens)
  replaysOnErrorSampleRate: 1.0,
  // Adds custom filtering before sending an Event to Sentry
  beforeSend: (event, hint) => {
    // Removes the Authorization Header from the Request
    if (event.request?.headers?.authorization) delete event.request.headers.authorization;

    // Attempts to grab the original Exception before any "magic" happens
    const exception = hint.originalException as Error;

    // We only want to capture Errors that have a Stack Trace and that are not Anonymous Errors
    return exception.stack && !exception.stack.includes("<anonymous>") ? event : null;
  },
});

// Attaches this Browser Client to Sentry
// getCurrentHub().setCurrentClient(sentryClient);
setCurrentClient(sentryClient);

// Loads this Dynamically to avoid adding this to the main bundle (initial load)
void import("@sentry/nextjs").then(({ BrowserTracing }) => {
  sentryClient.addIntegration(new BrowserTracing());
});

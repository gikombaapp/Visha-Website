import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  //returns normally when request is within bounds
  return;
};

export const config: Config = {
  path: "/api/*",
  rateLimit: {
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ["ip"],
    action: "rate_limit",
  },
};

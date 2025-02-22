import { z } from "zod";

export interface AlertFeature {
  properties: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

export interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

export interface AlertsResponse {
  features: AlertFeature[];
}

export interface PointsResponse {
  properties: {
    forecast?: string;
  };
}

export interface ForecastResponse {
  properties: {
    periods: ForecastPeriod[];
  };
}

export interface MCPTool<T = any> {
  name: string;
  description: string;
  schema: { [K in keyof T]: z.ZodType };
  callable: (params: T) => Promise<{
    content: Array<{
      type: "text";
      text: string;
      [key: string]: unknown;
    }>;
  }>;
}

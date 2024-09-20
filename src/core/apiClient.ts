import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

interface AxiosBaseQueryOptions {
  baseUrl?: string;
  prepareHeaders?: (headers: Record<string, string>) => Record<string, string>;
  axiosConfig?: AxiosRequestConfig;
}

interface AxiosQueryArgs {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export interface AxiosQueryError {
  status?: number;
  data?: unknown;
}

type AxiosBaseQuery = BaseQueryFn<AxiosQueryArgs, unknown, AxiosQueryError>;

export const apiClient = axios.create();

export const axiosBaseQuery =
  ({
    baseUrl = "",
    prepareHeaders,
    axiosConfig,
  }: AxiosBaseQueryOptions = {}): AxiosBaseQuery =>
  async ({ url, method, data, params, headers }) => {
    try {
      const config: AxiosRequestConfig = {
        ...axiosConfig,
        url: baseUrl + url,
        method: method ? method : "GET",
        data,
        params,
        headers,
      };

      if (prepareHeaders) {
        config.headers = prepareHeaders(
          (config.headers as AxiosRequestHeaders) || {}
        );
      }

      const result = await apiClient(config);

      return { data: result.data };
    } catch (error) {
      const { response, message } = error as AxiosError;

      return {
        error: {
          status: response?.status,
          data: response?.data || message,
        },
      };
    }
  };

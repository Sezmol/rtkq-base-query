import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../core/apiClient";
import { ChuckNorrisJokeResponse } from "../../types/chuckNorris";

export const chuckNorrisApi = createApi({
  reducerPath: "chuckNorrisApi",
  baseQuery: axiosBaseQuery({ baseUrl: "https://api.chucknorris.io" }),
  endpoints: ({ query }) => ({
    getRandomJoke: query<ChuckNorrisJokeResponse, void>({
      query: () => ({
        url: "/jokes/random",
      }),
    }),
  }),
});

export const { useGetRandomJokeQuery } = chuckNorrisApi;

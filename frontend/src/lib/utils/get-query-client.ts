import { isServer, QueryClient } from "@tanstack/react-query";

export const MakeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
};
let browserQueryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (isServer) {
    return MakeQueryClient();
  }

  if (!browserQueryClient) browserQueryClient = MakeQueryClient();
  return browserQueryClient;
};

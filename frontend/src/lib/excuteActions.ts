import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
};

export const executeActions = async <T>({ actionFn }: Options<T>) => {
  try {
    const response = await actionFn();
    return response;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    throw error;
  }
};

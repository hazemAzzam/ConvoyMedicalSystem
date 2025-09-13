import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  stateCreator: StateCreator<T, [["zustand/immer", never]], [], T>,
  config: ConfigType<T>,
) => {
  const { name, storage, skipPersist, excludeFromPersist } = config;

  const immerStore = immer(stateCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }
  return create<T>()(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist?.includes(key as keyof T),
          ),
        ),
    }),
  );
};
export { createStore };

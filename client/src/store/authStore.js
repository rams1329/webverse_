import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const authStore = (set) => ({
  auth: null,
  setAuth: (authInfo) => {
    set((state) => ({ auth: authInfo }));
  },
  removeAuth: () => set({ auth: null }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: "auth",
    })
  )
);

export default useAuthStore;

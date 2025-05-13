import { create } from "zustand"
import type { UserStore } from "@/app/types/userTypes"

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoading: false,

    setUser: (user) => set({ user }),

    fetchUser: async (id: string) => {
        set({ isLoading: true })
        try {
            const res = await fetch(`/api/user/${id}`)
            const data = await res.json();
            set({ user: data });
        } catch (error) {
            console.log("Failed to fetch user:", error);
        } finally {
            set({ isLoading: false })
        }
    }
}))
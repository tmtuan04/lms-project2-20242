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
//---------Phần trên mỗi khi load lại trang sẽ không fetch lại, sẽ bị mất hết dữ liệu và hiển thị mặc định

// import { create } from "zustand"
// import { persist } from "zustand/middleware"
// import type { UserStore } from "@/app/types/userTypes"

// export const useUserStore = create<UserStore>()(
//     persist(
//         (set) => ({
//             user: null,
//             isLoading: false,

//             setUser: (user) => set({ user }),

//             fetchUser: async (id: string) => {
//                 set({ isLoading: true });
//                 try {
//                     const res = await fetch(`/api/user/${id}`);
//                     const data = await res.json();
//                     set({ user: data });
//                 } catch (error) {
//                     console.log("Failed to fetch user:", error);
//                 } finally {
//                     set({ isLoading: false });
//                 }
//             }
//         }),
//         {
//             name: "user-store", // key trong localStorage
//         }
//     )
// )

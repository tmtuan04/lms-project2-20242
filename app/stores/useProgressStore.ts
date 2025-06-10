import { create } from "zustand";

interface ProgressStore {
  completedMap: Record<string, boolean>; // chapterId -> true/false
  setCompleted: (chapterId: string, isCompleted: boolean) => void;
  // Chức năng: Gán lại toàn bộ completedMap bằng một object mới. Dùng khi bạn fetch trạng thái từ server (ví dụ khi vừa load trang hoặc login).
  setManyCompleted: (data: Record<string, boolean>) => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  completedMap: {},
  setCompleted: (chapterId, isCompleted) =>
    set((state) => ({
      completedMap: {
        ...state.completedMap,
        [chapterId]: isCompleted,
      },
    })),
  setManyCompleted: (data) =>
    set(() => ({
      completedMap: data,
    })),
}));

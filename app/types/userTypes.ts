// 2 type này export để sử dụng cho global state

export type User = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  isInstructor: boolean;
};

export type UserStore = {
    user: User | null
    isLoading: boolean
    setUser: (user: User) => void
    fetchUser: (id: string) => Promise<void>
}

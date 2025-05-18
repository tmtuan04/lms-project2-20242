import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CourseState } from '../lib/definitions';


const savedTitle = localStorage.getItem("lastCreatedCourseTitle") || ""

const initialState = {
    title: savedTitle,
    titleConfirmed: !!savedTitle, // titleConfirmed: !!savedTitle là boolean: true nếu có title, false nếu rỗng
    description: "",
    descriptionConfirmed: false,
    imagePreview: null,
    imageConfirmed: false,
    category: "",
    categoryConfirmed: false,
    price: "",
    priceConfirmed: false,
    chapters: [],
    chaptersConfirmed: false,
}

export const useEditCourseStore = create<CourseState>()(
    persist(
        (set) => ({
            ...initialState,

            // Basic info actions
            setTitle: (title) => set({ title, titleConfirmed: false }),
            setTitleConfirmed: (confirmed) => set({ titleConfirmed: confirmed }),
            setDescription: (description) => set({ description, descriptionConfirmed: false }),
            setDescriptionConfirmed: (confirmed) => set({ descriptionConfirmed: confirmed }),
            setImagePreview: (preview) => set({ imagePreview: preview, imageConfirmed: false }),
            setImageConfirmed: (confirmed) => set({ imageConfirmed: confirmed }),
            setCategory: (category) => set({ category, categoryConfirmed: false }),
            setCategoryConfirmed: (confirmed) => set({ categoryConfirmed: confirmed }),
            setPrice: (price) => set({ price, priceConfirmed: false }),
            setPriceConfirmed: (confirmed) => set({ priceConfirmed: confirmed }),

            // Chapter actions
            addChapter: (chapter) => set((state) => ({
                chapters: [...state.chapters, chapter],
                chaptersConfirmed: false
            })),
            updateChapter: (id, chapter) => set((state) => ({
                chapters: state.chapters.map((c) =>
                    c.id === id ? { ...c, ...chapter } : c
                ),
                chaptersConfirmed: false
            })),
            deleteChapter: (id) => set((state) => ({
                chapters: state.chapters.filter((c) => c.id !== id),
                chaptersConfirmed: false
            })),
            setChaptersConfirmed: (confirmed) => set({ chaptersConfirmed: confirmed }),

            // Reset store
            resetStore: () => set(initialState),
        }),
        {
            name: 'course-storage',
            partialize: (state) => ({
                // Only persist these fields
                title: state.title,
                titleConfirmed: state.titleConfirmed,
                description: state.description,
                descriptionConfirmed: state.descriptionConfirmed,
                imagePreview: state.imagePreview,
                imageConfirmed: state.imageConfirmed,
                category: state.category,
                categoryConfirmed: state.categoryConfirmed,
                price: state.price,
                priceConfirmed: state.priceConfirmed,
                chapters: state.chapters,
                chaptersConfirmed: state.chaptersConfirmed,
            }),
        }
    )
)
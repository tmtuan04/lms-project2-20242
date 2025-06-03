import { create } from "zustand";
// import { persist } from "zustand/middleware";
import { ChapterState } from "@/app/lib/definitions";

const initialState = {
  title: "",
  titleConfirmed: false,
  description: "",
  descriptionConfirmed: false,
  videoFile: null,
  videoUrl: "",
  videoPreview: "",
  isEditingVideo: false,
  videoConfirmed: false,
  documents: [],
  documentLink: "",
  documentName: "",
  documentsConfirmed: false,
  accessMode: "free" as const,
  accessConfirmed: true,
};

export const useEditChapterStore = create<ChapterState>()(
  (set) => ({
    ...initialState,

    // Basic info actions
    setTitle: (title) => set({ title, titleConfirmed: false }),
    setTitleConfirmed: (confirmed) => set({ titleConfirmed: confirmed }),
    setDescription: (description) =>
      set({ description, descriptionConfirmed: false }),
    setDescriptionConfirmed: (confirmed) =>
      set({ descriptionConfirmed: confirmed }),

    // Video actions
    setVideoFile: (file) => set({ videoFile: file }),
    setVideoUrl: (url) => set({ videoUrl: url }),
    setVideoPreview: (preview) => set({ videoPreview: preview }),
    setIsEditingVideo: (isEditing) => set({ isEditingVideo: isEditing }),
    setVideoConfirmed: (confirmed) => set({ videoConfirmed: confirmed }),

    // Document actions
    setDocuments: (documents) => set({ documents, documentsConfirmed: false }),
    setDocumentLink: (link) => set({ documentLink: link }),
    setDocumentName: (name) => set({ documentName: name }),
    setDocumentsConfirmed: (confirmed) =>
      set({ documentsConfirmed: confirmed }),
    addDocument: (document) =>
      set((state) => ({
        documents: [...state.documents, document],
        documentsConfirmed: false,
      })),
    removeDocument: (index) =>
      set((state) => ({
        documents: state.documents.filter((_, i) => i !== index),
        documentsConfirmed: false,
      })),

    // Access actions
    setAccessMode: (mode) => set({ accessMode: mode }),
    setAccessConfirmed: (confirmed) => set({ accessConfirmed: confirmed }),

    // Reset store
    resetStore: () => set(initialState),
  })
  // {
  //     name: `chapter-storage`,
  //     partialize: (state) => ({
  //         // Only persist these fields
  //         title: state.title,
  //         titleConfirmed: state.titleConfirmed,
  //         description: state.description,
  //         descriptionConfirmed: state.descriptionConfirmed,
  //         videoUrl: state.videoUrl,
  //         videoPreview: state.videoPreview,
  //         videoConfirmed: state.videoConfirmed,
  //         documents: state.documents,
  //         documentsConfirmed: state.documentsConfirmed,
  //         accessMode: state.accessMode,
  //         accessConfirmed: state.accessConfirmed,
  //     }),
  // }
);

// Khi hoàn thiện xong dự án nên chia nhỏ interface/type ra nhiều file, module
// ---------------------------------------------------------------------------

// Interface cho Course Previews

export interface Instructor {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CourseData {
  title: string;
  description: string;
  category: string;
  instructorId: string;
  instructor: Instructor;
  enrolled: string; // Số người đăng ký
  chapters: string; // Số chapters
  rating: string;
  reviews: string; // Số nhận xét
  level: string;
  levelDescription: string;
  schedule: string;
  scheduleDetails: string;
  pace: string; // 5 cái này tạm thời fix cứng
  imageUrl: string;
  createdAt: string;
}

// Interface cho comment trong review
interface ReviewComment {
  id: number;
  user: {
    name: string;
    imageUrl: string;
  };
  comment: string;
  timestamp: string;
}

// Interface cho review
export interface Review {
  id: number;
  user: {
    name: string;
    imageUrl: string;
  };
  rating: number;
  comment: string;
  timestamp: string;
  likes: number;
  comments: ReviewComment[];
}

// -- Hết --

export interface Category {
  id: string;
  name: string;
}

type ChapterDocument = {
  id?: string;
  name: string;
  type: string;
  url: string;
};

export type Document = {
  id?: string;
  publicId?: string;
  name: string;
  type: string;
  url: string;
};

export interface ChapterState {
  // Basic info
  title: string;
  titleConfirmed: boolean;
  description: string;
  descriptionConfirmed: boolean;

  // Video
  videoFile: File | null;
  videoUrl: string;
  videoPreview: string;
  isEditingVideo: boolean;
  videoConfirmed: boolean;

  // Documents
  documents: ChapterDocument[];
  documentLink: string;
  documentName: string;
  documentsConfirmed: boolean;

  // Access
  accessMode: "locked" | "free";
  accessConfirmed: boolean;

  // Actions
  setTitle: (title: string) => void;
  setTitleConfirmed: (confirmed: boolean) => void;
  setDescription: (description: string) => void;
  setDescriptionConfirmed: (confirmed: boolean) => void;

  // Video actions
  setVideoFile: (file: File | null) => void;
  setVideoUrl: (url: string) => void;
  setVideoPreview: (preview: string) => void;
  setIsEditingVideo: (isEditing: boolean) => void;
  setVideoConfirmed: (confirmed: boolean) => void;

  // Document actions
  setDocuments: (documents: ChapterDocument[]) => void;
  setDocumentLink: (link: string) => void;
  setDocumentName: (name: string) => void;
  setDocumentsConfirmed: (confirmed: boolean) => void;
  addDocument: (document: ChapterDocument) => void;
  removeDocument: (index: number) => void;

  // Access actions
  setAccessMode: (mode: "locked" | "free") => void;
  setAccessConfirmed: (confirmed: boolean) => void;

  // Reset store
  resetStore: () => void;
}

type Chapter = {
  id: string;
  title: string;
  order: number;
  isEditing?: boolean;
  video?: {
    file: File | null;
    url: string;
    preview: string;
  };
  documents?: {
    name: string;
    type: string;
    url: string;
  }[];
  accessMode?: "locked" | "free";
};

export interface CourseState {
  // Course basic info
  title: string;
  titleConfirmed: boolean;
  description: string;
  descriptionConfirmed: boolean;
  imagePreview: string | null;
  imageConfirmed: boolean;
  category: string;
  categoryConfirmed: boolean;
  price: string;
  priceConfirmed: boolean;

  // Chapters
  chapters: Chapter[];
  chaptersConfirmed: boolean;

  // Actions
  setTitle: (title: string) => void;
  setTitleConfirmed: (confirmed: boolean) => void;
  setDescription: (description: string) => void;
  setDescriptionConfirmed: (confirmed: boolean) => void;
  setImagePreview: (preview: string | null) => void;
  setImageConfirmed: (confirmed: boolean) => void;
  setCategory: (category: string) => void;
  setCategoryConfirmed: (confirmed: boolean) => void;
  setPrice: (price: string) => void;
  setPriceConfirmed: (confirmed: boolean) => void;

  // Chapter actions
  addChapter: (chapter: Chapter) => void;
  updateChapter: (id: string, chapter: Partial<Chapter>) => void;
  deleteChapter: (id: string) => void;
  setChaptersConfirmed: (confirmed: boolean) => void;

  // Reset store
  resetStore: () => void;
}

export interface PaymentStatus {
  status: string;
}

export type CourseCardProps = {
  id: string;
  instructor: string;
  instructorId: string;
  title: string;
  category: string;
  chaptersCount: number;
  price: number;
  imageUrl: string;
  avgRating?: number;
  enrollmentCount?: number;
  reviewCount?: number;
};

export interface LessonProps {
  id: string;
  title: string;
  isLocked: boolean;
  videoUrl: string;
  content: string;
  order: number;
  courseName: string;
  courseId: string;
}

export interface Lesson {
  id: string;
  title: string;
  courseId: string;
  videoUrl: string;
  courseName: string;
  isLocked: boolean;
  description?: string;
}

export interface CourseWithLessons {
  id: string;
  title: string;
  description: string;
  price: number;
  chaptersCount: number;
  imageUrl: string;
  instructor: string;
  chapters: {
    id: string;
    title: string;
    videoUrl: string;
    isLocked: boolean;
    description?: string;
    attachments: {
      id: string;
      name: string;
      url: string;
    }[];
  }[];
}

export interface CourseTableData {
  id: string;
  title: string;
  price: number;
  status: "Published" | "Draft";
}

export interface CourseTableDataBasic {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  instructorId: string;
  isPublished: boolean;
  chapters: {
    id: string;
    title: string;
    order: number;
  }[];
}

export interface UserCourseCardProps {
  id: string;
  instructor: string;
  instructorId: string;
  title: string;
  category: string;
  chaptersCount: number;
  completedChaptersCount: number;
  imageUrl: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  image_url: string;
  amount: number;
  course_title?: string;
  joined_at: Date;
}

export interface RevenueChartData {
  month: string;
  venenue: number;
}
export type CourseRevenueItem = { month: string } & Record<string, number | string>;


export interface CourseInfo {
  id: string;
  title: string;
  completedPercent: number,
  image_url: string,
  coursejoin: Date
}
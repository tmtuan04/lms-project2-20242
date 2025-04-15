export const courses = [
  {
    id: "1",
    title: "Fullstack Development for Beginers",
    description: "Learn the fundamentals of full-stack web development with Next.js, React, and Node.js. This comprehensive course will take you from beginner to professional developer.",
    price: 200000,
    chaptersCount: 3,
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
    instructor: "John Doe",
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction",
        description: "Get started with web development fundamentals and set up your development environment.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isLocked: false,
        attachments: [
          {
            id: "attachment-1",
            name: "Setup Guide.pdf",
            url: "/attachments/setup-guide.pdf"
          },
          {
            id: "attachment-2",
            name: "Course Overview.pdf",
            url: "/attachments/course-overview.pdf"
          }
        ]
      },
      {
        id: "chapter-2",
        title: "HTML & CSS Basics",
        description: "Learn the building blocks of web development with HTML and CSS.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isLocked: true,
        attachments: [
          {
            id: "attachment-3",
            name: "HTML Cheatsheet.pdf",
            url: "/attachments/html-cheatsheet.pdf"
          }
        ]
      },
      {
        id: "chapter-3",
        title: "JavaScript Fundamentals",
        description: "Master the basics of JavaScript programming.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isLocked: true,
        attachments: [
          {
            id: "attachment-4",
            name: "JavaScript Exercises.pdf",
            url: "/attachments/js-exercises.pdf"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Deep dive into advanced React patterns and best practices for building scalable applications.",
    price: 300000,
    chaptersCount: 2,
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2940&auto=format&fit=crop",
    instructor: "Jane Smith",
    chapters: [
      {
        id: "chapter-1",
        title: "Component Patterns",
        description: "Learn advanced React component patterns and when to use them.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isLocked: false,
        attachments: [
          {
            id: "attachment-1",
            name: "React Patterns Guide.pdf",
            url: "/attachments/react-patterns.pdf"
          }
        ]
      },
      {
        id: "chapter-2",
        title: "State Management",
        description: "Master state management in React applications.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        isLocked: true,
        attachments: [
          {
            id: "attachment-2",
            name: "State Management Examples.pdf",
            url: "/attachments/state-examples.pdf"
          }
        ]
      }
    ]
  }
];

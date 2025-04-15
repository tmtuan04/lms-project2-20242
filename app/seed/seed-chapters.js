import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Thay courseId bằng ID của course thực tế của bạn
  const courseId = "82dfcaf6-39b2-4c20-8c54-a140221ff373"

  // Tạo Introduction chapter
  const chapter1 = await prisma.chapter.create({
    data: {
      title: "Introduction",
      description: "Get started with web development fundamentals. Learn about the course structure and what you'll achieve.",
      videoUrl: "https://youtu.be/your-video-id",
      courseId: courseId,
      attachments: {
        create: [
          {
            name: "Course Overview.pdf",
            url: "/attachments/course-overview.pdf"
          }
        ]
      }
    }
  })

  // Tạo HTML Fundamentals chapter
  const chapter2 = await prisma.chapter.create({
    data: {
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML, including tags, elements, and document structure.",
      videoUrl: "https://youtu.be/your-video-id",
      courseId: courseId,
      attachments: {
        create: [
          {
            name: "HTML Cheatsheet.pdf",
            url: "/attachments/html-cheatsheet.pdf"
          }
        ]
      }
    }
  })

  // Tạo CSS Basics chapter
  const chapter3 = await prisma.chapter.create({
    data: {
      title: "CSS Basics",
      description: "Understand CSS fundamentals, including selectors, properties, and styling techniques.",
      videoUrl: "https://youtu.be/your-video-id",
      courseId: courseId,
      attachments: {
        create: [
          {
            name: "CSS Guide.pdf",
            url: "/attachments/css-guide.pdf"
          }
        ]
      }
    }
  })

  console.log('Chapters created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
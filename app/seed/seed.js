// File này để seed data vào database 
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seedUsers(count) {
  const users = Array.from({ length: count }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    authProvider: faker.helpers.arrayElement(["google", "facebook", "email"]),
    isActive: faker.datatype.boolean(),
    isInstructor: faker.datatype.boolean(),
  }));

  try {
    await prisma.user.createMany({ data: users, skipDuplicates: true });
    console.log(`Inserted ${count} users successfully!`);
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedCategories() {
  const techCategories = [
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "Software Engineering",
    "Web Development",
    "Blockchain",
    "Internet of Things",
    "Computer Vision",
  ];

  const categories = techCategories.map((name) => ({ name }));
  console.log(categories);

  try {
    // Đảm bảo rằng object trong data có các thuộc tính trùng tên với cột trong database, Prisma sẽ hiểu và chèn dữ liệu đúng
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
    console.log(`Inserted ${categories.length} categories successfully!`);
  } catch (error) {
    console.error("Error inserting categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedCourses(count) {
  try {
    // Lấy danh sách user có thể làm instructor
    // Có một vấn đề là genRandom thì có thể false hết -> fix sau
    const instructors = await prisma.user.findMany({
      where: { isInstructor: true },
      select: { id: true },
    });

    // Lấy danh sách category đã có
    const categories = await prisma.category.findMany({
      select: { id: true },
    });

    if (instructors.length === 0 || categories.length === 0) {
      console.error("Error: Need at least one instructor and one category.");
      return;
    }

    const courses = Array.from({ length: count }).map(() => ({
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      imageUrl: faker.image.url(),
      chapter: faker.number.int({ min: 1, max: 20 }),
      price: parseFloat(faker.commerce.price({ min: 0, max: 1000000 })),
      isPublished: faker.datatype.boolean(),
      instructorId: faker.helpers.arrayElement(instructors).id,
      categoryId: faker.helpers.arrayElement(categories).id,
    }));

    await prisma.course.createMany({ data: courses });
    console.log(`Inserted ${count} courses successfully!`);
  } catch (error) {
    console.error("Error inserting courses:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers(10);
seedCategories();
seedCourses(3);
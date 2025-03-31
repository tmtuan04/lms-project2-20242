// File này demo sinh data từ @faker-js/faker
import { faker } from "@faker-js/faker";

// Array.from() là một phương thức trong JavaScript giúp tạo một mảng mới
// từ một đối tượng giống mảng (array-like object) hoặc một iterable (có thể lặp được như Set, Map, String...).

// users data
function generateUsers(count) {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    authProvider: faker.helpers.arrayElement(["google", "facebook", "email"]),
    isActive: faker.datatype.boolean(),
    isInstructor: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  }));
}

console.log(generateUsers(5));

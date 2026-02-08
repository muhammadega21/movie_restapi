import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { prisma } from "../../src/lib/prisma.js";

export const seedUsers = async (count = 10) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: await bcrypt.hash("password", 10),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });
};

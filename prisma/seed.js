import { prisma } from "../src/lib/prisma.js";
import { seedMovies } from "./seeders/movieSeeder.js";
import { seedUsers } from "./seeders/userSeeder.js";

const main = async () => {
  console.log("Seeding database...");

  await seedUsers(5);

  const users = await prisma.user.findMany({
    select: { id: true },
  });

  await seedMovies(
    users.map((u) => u.id),
    30,
  );

  console.log("Seeding completed");
};

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

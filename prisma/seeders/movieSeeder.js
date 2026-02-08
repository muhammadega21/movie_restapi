import { faker } from "@faker-js/faker";
import { prisma } from "../../src/lib/prisma.js";

export const seedMovies = async (userIds, count = 20) => {
  const movies = [];

  for (let i = 0; i < count; i++) {
    movies.push({
      title: faker.book.title(),
      overview: faker.lorem.paragraph(),
      releaseYear: faker.number.int({ min: 1970, max: 2024 }),
      runtime: faker.number.int({ min: 80, max: 180 }),
      genres: faker.helpers.arrayElements(
        ["Action", "Drama", "Crime", "Thriller", "Comedy"],
        { min: 1, max: 3 },
      ),
      posterUrl: faker.image.urlPicsumPhotos(),
      createdBy: faker.helpers.arrayElement(userIds),
    });
  }

  await prisma.movie.createMany({ data: movies });
};

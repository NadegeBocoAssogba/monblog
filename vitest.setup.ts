import { execSync } from "child_process";
import { afterAll, beforeAll } from "vitest";
import { prisma } from "./lib/prisma";

// Initialisation de la base de données en mémoire
try {
    execSync('npx prisma db push prisma/shema.test.prisma', { stdio: 'inherit'})
} catch (error) {
    console.error("Impossible d'initialiser la db en mémoire:", error);
    process.exit(1);
}

// Vider la bd avant chaque test
beforeAll(async () => {
  await prisma.article.deleteMany();
});

// Déconnexion de la bd après tous les tests
afterAll(async () => {
  await prisma.$disconnect();
});
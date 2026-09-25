import "dotenv/config";
import bcrypt from 'bcrypt';
import {prisma} from '../lib/prisma';

async function main() {
    const password = "Admin123456"
    const hashedpassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@monblog.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@monblog.com",
      password: hashedpassword,
      role: "ADMIN",
    },
  });
  console.log("Administrateur créé :", admin.email);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import Image from "next/image";
import ArticleCard from "@/components/blog/ArticleCard";
import bgImage from "@/public/bgHero.jpg";

// Créer une migration, générer le client prisma et 
// l'importer dans le fichier page.tsx pour récupérer les articles depuis la base de données.
import {prisma} from "@/lib/prisma";


export default async function Home() {
  const articles = await prisma.article.findMany();
  return (
    <main className="min-h-screen flex flex-col items-center gap-4">
      <div className="relative h-64 w-full mb-6 flex items-center justify-center">
        <Image
          src={bgImage}
          alt="Background image"
          fill
          className="object-cover"
          loading="eager"
        />
         <div className="absolute inset-0 bg-black/55 z-10" />
        <div className="relative z-20 inset-0 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white">Bienvenue sur mon blog !</h1>
          <p className="text-lg text-gray-300 mt-2">
            Ceci est un blog d&apos;essai créé avec Next.js et Tailwind CSS.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold mb-4">Articles récents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              date={article.createdAt.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              slug={article.slug}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

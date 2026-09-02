import { prisma } from "@/lib/prisma";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import DeleteArticleButton from "@/components/blog/DeleteArticleButton";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Articles
          </h1>

          <p className="mt-2 text-gray-600">
            Gérez les articles de votre blog.
          </p>
        </div>

        <Button asChild>
          <Link href="/articles/new">
            Nouvel article
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-lg border p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {article.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {article.excerpt}
                </p>
              </div>

              <Badge
                variant={
                  article.published 
                    ? "default" : "secondary"}
              > 
                {article.published
                  ? "Publié"
                  : "Brouillon"
                }
              </Badge>
            </div>

            <div className="mt-5 flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/articles/${article.id}/edit`}>
                  Modifier
                </Link>
              </Button>
              <DeleteArticleButton id={article.id} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
import {prisma} from "@/lib/prisma";
import {notFound} from "next/navigation"
import EditArticleForm from "@/components/blog/EditArticleForm";
import NotFound from "next/dist/client/components/builtin/not-found";

type EditArticlePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditArticlePage({
    params,
}:EditArticlePageProps){
    const {id} = await params;
    const articleId = Number(id);
    if (Number.isNaN(articleId)){
        notFound();
    }
    const article = await prisma.article.findUnique({
        where: {
            id: articleId,
        }
    });
    if (!article){
        NotFound();
    }
    return (
        <main className="mx-auto max-w-3xl p-8">
        <h1 className="mb-8 text-3xl font-bold">
            Modifier l&apos;article
        </h1>

        <EditArticleForm article={article} />
        </main>
    );
}
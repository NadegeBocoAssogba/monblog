import ArticleForm from '@/components/blog/ArticleForm';
import { requireAuth } from '@/lib/auth-helpers';

export default async function NewArticlePage() {
    await requireAuth();
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold mb-4">Créer un nouvel article</h1>
            <ArticleForm />
        </div>
    );
}
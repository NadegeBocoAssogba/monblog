import ArticleForm from '@/components/blog/ArticleForm';

export default function NewArticlePage() {
    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4 items-center">
            <h1 className="text-2xl font-bold mb-4">Créer un nouvel article</h1>
            <ArticleForm />
        </div>
    );
}
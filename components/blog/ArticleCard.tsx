type ArticleCardProps = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
};

export default function ArticleCard({ title, excerpt, date }: ArticleCardProps) {
  return (
    <article className="rounded-lg border p-6 shadow-md transition-transform hover:scale-105">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-600">{excerpt}</p>
      <p className="mt-4 text-sm text-gray-500">{date}</p>
    </article>
  );
}
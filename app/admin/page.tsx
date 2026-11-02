export default function Page() {
    return (
        <div>
            <h1 className="text-xl font-bold">Page d&apos;administration du blog</h1>
            <p>Bienvenue sur la page d&apos;administration du blog. Ici, vous pouvez gérer les articles, les utilisateurs et d&apos;autres fonctionnalités administratives.</p>
            <ul className="mt-4 list-disc pl-5">
                <li>Créer un nouvel article</li>
                <li>Gérer les utilisateurs</li>
                <li>Paramètres du site</li>
            </ul>

        </div>
    );
}
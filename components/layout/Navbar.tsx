import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-purple-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <h1 className="text-xl font-bold">Mon blog</h1>
                <div className="flex gap-6">
                    <Link href="/">Accueil</Link>
                    <Link href="/about">À propos</Link>
                    <Link href="/articles">Articles</Link>
                </div>
            </div>
        </nav>
    );
}
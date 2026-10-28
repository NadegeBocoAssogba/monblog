import { logout } from "@/actions/auth";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-purple-200">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <span className="text-xl font-bold">Mon blog</span>
                <div className="flex gap-6">
                    <Link href="/">Accueil</Link>
                    <Link href="/about">À propos</Link>
                    <Link href="/articles">Articles</Link>
                </div>
                <div className="flex gap-4">
                    <Link href="/login" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Se connecter
                    </Link>
                   
                    <form action={logout}>
                        <button type="submit" className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                            Se déconnecter
                        </button>
                    </form>

                </div>
            </div>
        </nav>
    );
}
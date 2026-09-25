"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [error, setError] = useState('');
    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        if (result?.error) {
            setError("Email ou mot de passe incorrect.");
        }
        window.location.href = '/admin';
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                />
            </div>

            <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                />
            </div>
            {error && (
                <p>{error}</p>
            )}
            <button type="submit">Se connecter</button>
        </form>
    );
}
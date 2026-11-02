
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/auth";

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined,
  );

  return (
    <form action={formAction} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="name">Nom</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          className="block w-full rounded-md border p-2"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="block w-full rounded-md border p-2"
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="block w-full rounded-md border p-2"
          placeholder="8 caractères minimum"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="block w-full rounded-md border p-2"
          placeholder="Répétez le mot de passe"
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? "Inscription en cours..." : "Créer mon compte"}
      </button>

      <p className="text-sm">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Connectez-vous
        </Link>
      </p>
    </form>
  );
}

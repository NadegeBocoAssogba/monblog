"use client"
import {createArticle} from "@/actions/article";
import {useActionState} from "react"

const initialState = {
    errors: {},
    message: "",
}
export default function ArticleForm(){
    const [state, formAction, isPending] = useActionState(
        createArticle,
        initialState
    );

    return(
        <form action={formAction} className="flex flex-col gap-4 items-center p-6 border-2">
            <div className="flex items-center w-full gap-2 border-2">
                <label htmlFor="title">Titre :</label>
                <input type="text" name="title" placeholder="Titre de l'article" className="border p-2 rounded"/>
                {state.errors?.title && (
                    <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>
                )}
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="slug">Slug :</label>
                <input type="text" name="slug" placeholder="Slug de l'article" className="border p-2 rounded"/>
                {state.errors?.slug && (
                    <p className="mt-1 text-sm text-red-600">
                        {state.errors.slug[0]}
                    </p>
                )}
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="excerpt">Extrait :</label>
                <textarea name="excerpt" placeholder="Extrait de l'article" className="border p-2 rounded"/>
                {state.errors?.excerpt && (
                    <p className="mt-1 text-sm text-red-600">
                        {state.errors.excerpt[0]}
                    </p>
                )}
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="content">Contenu :</label>
                <textarea name="content" placeholder="Contenu de l'article" rows={10} className="border p-2 rounded"/>
                {state.errors?.content && (
                    <p className="mt-1 text-sm text-red-600">
                        {state.errors.content[0]}
                    </p>
                )}
            </div>
            {state.message && (
                <p className="text-sm text-red-600">
                {state.message}
                </p>
            )}

            <div className="flex items-center gap-2">
                <input
                    id="published"
                    name="published"
                    type="checkbox"
                    className="h-4 w-4"
                />

                <label htmlFor="published">
                    Publier cet article
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="rounded-md bg-blue-500 px-5 py-2 cursor-pointer text-white disabled:opacity-50 hover:bg-blue-600"
            >
                {isPending ? "Création..." : "Créer l'article"}
            </button>
        </form>
    )
}
// Une Server Action ne doit pas être appelée 
// depuis le client avec un simple bouton onClick. 
// Il faut donc créer une action
// qui appelle la suppression de l'article.
"use client";

// import { useMutation } from "@tanstack/react-query";
import { deleteArticle } from "@/actions/article";
// import { useRouter } from "next/navigation";

type DeleteArticleButtonProps = {
  id: number;
};

export default function DeleteArticleButton({ id }: DeleteArticleButtonProps) {
    async function handleDelete() {
        const confirmed = window.confirm(
            "Voulez-vous vraiment supprimer cet article ?"
        );
        if (!confirmed) {
            return;
        }

        await deleteArticle(id);

        
    
    }
    return(
        <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md"
        >
            Supprimer
        </button>       
    );

}
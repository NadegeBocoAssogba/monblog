import {createArticle} from "@/actions/article";

export default function ArticleForm(){
    return(
        <form action={createArticle} className="flex flex-col gap-4 items-center p-6 border-2">
            <div className="flex items-center w-full gap-2 border-2">
                <label htmlFor="title">Titre :</label>
                <input type="text" name="title" placeholder="Titre de l'article" className="border p-2 rounded"/>
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="slug">Slug :</label>
                <input type="text" name="slug" placeholder="Slug de l'article" className="border p-2 rounded"/>
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="excerpt">Extrait :</label>
                <textarea name="excerpt" placeholder="Extrait de l'article" className="border p-2 rounded"/>
            </div>
            <div className="flex items-center w-full gap-2">
                <label htmlFor="content">Contenu :</label>
                <textarea name="content" placeholder="Contenu de l'article" rows={10} className="border p-2 rounded"/>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600">Créer l&apos;article</button>
        </form>
    )
}
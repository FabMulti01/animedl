//La lista di tutte le routes
//Per i siti viene creata dinamicamente tramite "sito"

import { Sites } from "./sites/Sites";
import { DownloadList } from "@/components/Download/DownloadList";
import { Cerca } from "@/components/Menu/Cerca";
import { Settings } from "@/components/Menu/Impostazioni/Impostazioni";
import { DownloadAnimePage } from "@/components/Download/DownloadInfo/DownloadAnimeInfo";

export type page = {
    /**
     * Il path utilizzato per il router
     */
    path: string;
    /**
     * Il nome del componente
     */
    nome: string;
    /**
     * Il componente (proprio lui)
     */
    component: React.FC;
    /**
     * Nome alternativo per il componente,
     * Utile per il router
     */
    altNome?: string;
    /**
     * Se il path deve essere esatto
     */
    exact?: boolean;
};

export function loadPages(): page[] {
    let page: page[] = [
        {
            path: "/",
            nome: "Cerca",
            component: Cerca,
            exact: true,
        },
        {
            path: "Settings",
            nome: "Impostazioni",
            component: Settings,
        },
        {
            path: "Downloads",
            nome: "Downloads",
            component: DownloadList,
        },
        {
            path: "DownloadAnimeInfo/:nome",
            nome: "Download Info",
            component: DownloadAnimePage,
        },
    ];
    //Vengono aggiunte le routes per i siti
    page = page.concat(Sites);
    return page;
}

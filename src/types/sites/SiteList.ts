import { Iviews } from "../Views";

//AnimeWorld
import { AWSearch } from "@/components/Sites/AnimeWorld/AWSearch";
import { AWInfoMain } from "@/components/Sites/AnimeWorld/AWInfo";

//Nyaa
import { NyaaSearch } from "@/components/Sites/Nyaa/NyaaSearch";
import { NyaaInfo } from "@/components/Sites/Nyaa/NyaaInfo";

//Winds Of Re:Sub

//Quando si aggiunge un nuovo sito, aggiungere il nome nella lista sotto
//E aggiungerlo anche nel routing nel file "ÄnimeDL.tsx"
//Usare sempre "<nomesito>Search" per permettere al router di funzionare correttamente
//Alt name viene utilizzato in caso il nome é diverso da quello usato nel path
//Il nome é utilizzato in base alla pagina, per la pagina delle info lasicare Info
export const AnimeSites: Iviews[] = [
    {
        path: "AWSearch/:nome",
        nome: "AnimeWorld",
        component: AWSearch,
        altNome: "AW",
    },
    {
        path: "AWInfo/:nome",
        nome: "Info",
        component: AWInfoMain,
        altNome: "AW",
    },
    {
        path: "NyaaSearch/:nome",
        nome: "Nyaa",
        component: NyaaSearch,
        altNome: "Nyaa",
    },
    {
        path: "NyaaInfo/:nome",
        nome: "Info",
        component: NyaaInfo,
        altNome: "Nyaa",
    },
    // {
    //     path: "WORSearch/:nome",
    //     nome: "Winds of Re:Sub",
    //     component: null,
    //     altNome: "WOR",
    // },
    // {
    //     path: "WORInfo/:nome",
    //     nome: "Info",
    //     component: null,
    //     altNome: "WOR",
    // },
];

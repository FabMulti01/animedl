import type { DDLBase } from "@interfaces/IDDL";
import { useLoaderData } from "react-router";
import { Group } from "@mantine/core";
import SiteNoResult from "../../utils/SiteNoResult";
import SiteTitle from "../../utils/SiteTitle";
import DDLSearchEntry from "./DLLSearchEntry";

const DDLSearch = () => {
    const { sito, titolo, lista } = useLoaderData() as {
        sito: string;
        titolo: string;
        lista: DDLBase[];
    };

    if (lista.length == 0) {
        return (
            <>
                <SiteTitle sito={sito} titolo={titolo} />
                <SiteNoResult titolo={titolo} />
            </>
        );
    }

    return (
        <>
            <SiteTitle sito={sito} titolo={titolo} />
            <Group>
                {lista.map((anime) => {
                    return <DDLSearchEntry key={anime.titolo} anime={anime} />;
                })}
            </Group>
        </>
    );
};

export default DDLSearch;

import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { Table } from "@mantine/core";
import TorrentSearchLingua from "./TorrentSearchLingua.js";
import TorrentList from "./TorrentSearchList.js";
import TorrentSearchPagine from "./TorrentSearchPagine.js";
import TorrentSearchOrdine from "./TorrentSearchOrdineBase.js";
import SiteTitle from "@components/site/utils/SiteTitle.js";
import type Torrent from "@interfaces/ITorrent.js";

const TorrentSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { sito, titolo, torrent } = useLoaderData() as {
        sito: string;
        titolo: string;
        torrent: Torrent;
    };
    const [ORDINE, setOrdine] = useState<string>(
        searchParams.get("ordine") ?? ""
    );
    const [LINGUA, setLingua] = useState<string>(
        searchParams.get("lingua") ?? ""
    );
    const [PAGINA, setPagina] = useState<number>(
        parseInt(searchParams.get("pagina")) || 1
    );

    useEffect(() => {
        setSearchParams(
            { ordine: ORDINE, lingua: LINGUA, pagina: PAGINA.toString() },
            { viewTransition: true }
        );
    }, [ORDINE, LINGUA, PAGINA]);

    function handleOrdine(scelta: string) {
        if (scelta != ORDINE) {
            setOrdine(scelta);
        }
    }

    function handlePagine(scelta: number) {
        if (scelta != PAGINA) {
            setPagina(scelta);
        }
    }

    return (
        <>
            <SiteTitle sito={sito} titolo={titolo} />
            <TorrentSearchLingua
                lingua={torrent.getLingua()}
                scelta={LINGUA}
                setLingua={setLingua}
            />
            <Table withTableBorder>
                <Table.Thead>
                    <TorrentSearchOrdine
                        ordine={torrent.getOrdine()}
                        scelta={ORDINE}
                        handleOrdine={handleOrdine}
                    />
                </Table.Thead>
                <Table.Tbody>
                    <TorrentList lista={torrent.lista} />
                </Table.Tbody>
                <Table.Caption>
                    <TorrentSearchPagine
                        pagine={torrent.getPagine()}
                        scelta={PAGINA}
                        handlePagine={handlePagine}
                    />
                </Table.Caption>
            </Table>
        </>
    );
};

export default TorrentSearch;

import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { Stack, Table, Text } from "@mantine/core";
import TorrentSearchLingua from "./TorrentSearchLingua.js";
import TorrentList from "./TorrentSearchList.js";
import TorrentSearchPagine from "./TorrentSearchPagine.js";
import TorrentSearchOrdine from "./TorrentSearchOrdineBase.js";
import SiteTitle from "@components/site/utils/SiteTitle.js";
import type Torrent from "@interfaces/ITorrent.js";

const TorrentSearch = () => {
    const [primo, setPrimo] = useState(true);
    const [UPDATE, setUpdate] = useState(false);
    const [searchparams, setSearchParams] = useSearchParams();
    const { sito, titolo, torrent } = useLoaderData() as {
        sito: string;
        titolo: string;
        torrent: Torrent;
    };
    const [ORDINE, setOrdine] = useState<string>(
        searchparams.get("ordine") ?? torrent.getOrdine().DATA_DESC
    );
    const [LINGUA, setLingua] = useState<string>(
        searchparams.get("lingua") ?? torrent.getLingua().TUTTO
    );
    //É sempre presente almeno una pagina
    const [PAGINA, setPagina] = useState<number>(
        parseInt(searchparams.get("pagina")) || 1
    );

    //Il primo render non deve essere presente nello storico in quanto non ha dati
    useEffect(() => {
        setPrimo(false);
    }, []);

    //Se utilizzo i tasti di navigazione o qualche hotkey (es. tasti mouse)
    //viene forzato l'update degli stati
    useEffect(() => {
        setOrdine(searchparams.get("ordine"));
        setLingua(searchparams.get("lingua"));
        setPagina(parseInt(searchparams.get("pagina")));
    }, [searchparams]);

    useEffect(() => {
        setSearchParams(
            { ordine: ORDINE, lingua: LINGUA, pagina: PAGINA.toString() },
            { viewTransition: true, replace: primo }
        );
    }, [UPDATE]);

    function handleOrdine(scelta: string) {
        if (scelta != ORDINE) {
            setOrdine(scelta);
            setUpdate(!UPDATE);
        }
    }

    function handleLingua(lingua: string) {
        setLingua(lingua);
        //Resetto anche la pagina
        setPagina(1);
        setUpdate(!UPDATE);
    }

    function handlePagine(scelta: number) {
        if (scelta != PAGINA) {
            setPagina(scelta);
            setUpdate(!UPDATE);
        }
    }

    return (
        <>
            <SiteTitle sito={sito} titolo={titolo} />
            <TorrentSearchLingua
                lingua={torrent.getLingua()}
                scelta={LINGUA}
                handleLingua={handleLingua}
            />
            {torrent.lista.length == 0 ? (
                <Stack h="100%" align="center" justify="center">
                    <Text>Nessun risultato</Text>
                </Stack>
            ) : (
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
            )}
        </>
    );
};

export default TorrentSearch;

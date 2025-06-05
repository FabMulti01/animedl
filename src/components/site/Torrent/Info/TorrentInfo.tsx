import { useLoaderData } from "react-router";
import { Table } from "@mantine/core";
import SiteTitle from "@components/site/utils/SiteTitle";
import FavoritesButton from "@components/favorites/FavoritesButton";
import type { TorrentAnime } from "@interfaces/ITorrent";
import TorrentInfoLeft from "./TorrentInfoLeft";
import TorrentInfoDescrizione from "./TorrentInfoDescrizione";

const TorrentInfo = () => {
    const { sito, url, info } = useLoaderData() as {
        sito: string;
        url: string;
        info: TorrentAnime;
    };

    return (
        <>
            <SiteTitle sito={sito} titolo={info.titolo} />
            <Table captionSide="bottom">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={236} />
                        <Table.Th />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td valign="top">
                            <TorrentInfoLeft
                                data={info.data}
                                seed={info.seed}
                                peso={info.peso}
                                magnet={info.magnet}
                            />
                            <FavoritesButton
                                props={{
                                    sito: info.sito,
                                    titolo: info.titolo,
                                    url: url,
                                    fullWidth: true,
                                }}
                            />
                        </Table.Td>
                        <Table.Td valign="top">
                            <TorrentInfoDescrizione
                                descrizione={info.descrizione}
                            />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Caption>
                    Tutti i link nella descrizione sono disabilitati
                </Table.Caption>
            </Table>
        </>
    );
};

export default TorrentInfo;

import { Anchor, Table } from "@mantine/core";
import { useNavigate } from "react-router";
import type { TorrentAnime } from "@interfaces/ITorrent.js";
import TorrentSearchMagnet from "./TorrentSearchMagnet.js";

const TorrentList = ({ lista }: { lista: TorrentAnime[] }) => {
    const navigate = useNavigate();

    return lista.map((torrent) => {
        return (
            <Table.Tr key={torrent.url}>
                <Table.Td>
                    <Anchor
                        size="sm"
                        lineClamp={1}
                        onClick={() => {
                            navigate(
                                "/Torrent/info/" +
                                    torrent.sito +
                                    "/" +
                                    encodeURIComponent(torrent.url)
                            );
                        }}
                    >
                        {torrent.titolo.replaceAll(/[.\-\_]+/g, " ")}
                    </Anchor>
                </Table.Td>
                <Table.Td>{torrent.data.toString()}</Table.Td>
                <Table.Td>{torrent.peso}</Table.Td>
                <Table.Td>{torrent.seed}</Table.Td>
                <Table.Td>
                    <TorrentSearchMagnet magnet={torrent.magnet} />
                </Table.Td>
            </Table.Tr>
        );
    });
};

export default TorrentList;

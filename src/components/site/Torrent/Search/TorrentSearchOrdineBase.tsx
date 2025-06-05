import { Table } from "@mantine/core";
import TorrentSearchOrdine from "./TorrenSearchOrdine.js";
import type { TorrentOrdine } from "@interfaces/ITorrent.js";

const TorrentSearchOrdineBase = ({
    ordine,
    scelta,
    handleOrdine,
}: {
    ordine: TorrentOrdine;
    scelta: string;
    handleOrdine(ordine: string): void;
}) => {
    return (
        <Table.Tr>
            <Table.Th w={"auto"}>Nome</Table.Th>
            <Table.Th w={100}>
                <TorrentSearchOrdine
                    testo="Data"
                    asc={ordine.DATA_ASC}
                    desc={ordine.DATA_DESC}
                    scelta={scelta}
                    handleOrdine={handleOrdine}
                />
            </Table.Th>
            <Table.Th w={100}>
                <TorrentSearchOrdine
                    testo="Peso"
                    asc={ordine.PESO_ASC}
                    desc={ordine.PESO_DESC}
                    scelta={scelta}
                    handleOrdine={handleOrdine}
                />
            </Table.Th>
            <Table.Th w={100}>
                <TorrentSearchOrdine
                    testo="Seed"
                    asc={ordine.SEED_ASC}
                    desc={ordine.SEED_DESC}
                    scelta={scelta}
                    handleOrdine={handleOrdine}
                />
            </Table.Th>
            <Table.Th w={100}>Magnet</Table.Th>
        </Table.Tr>
    );
};

export default TorrentSearchOrdineBase;

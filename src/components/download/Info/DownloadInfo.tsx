import { Stack, Table, Text } from "@mantine/core";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import DownloadStore from "@stores/DownloadStore.js";
import DownloadInfoEntry from "./DownloadInfoEntry.js";
import DownloadInfoTitle from "./DownloadInfoTitle.js";
import DownloadInfoControlButtons from "./DownloadInfoControlButtons.js";

const DownloadInfo = observer(() => {
    const { sito, titolo } = useParams();

    if (!DownloadStore.anime.has(titolo)) {
        return (
            <>
                <DownloadInfoTitle sito={sito} titolo={titolo} />
                <Stack h={"100%"} align="center" justify="center">
                    <Text>
                        Non stai scaricando nessun episodio di questo anime...
                    </Text>
                </Stack>
            </>
        );
    } else {
        return (
            <>
                <DownloadInfoTitle sito={sito} titolo={titolo} />
                <DownloadInfoControlButtons titolo={titolo} />
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={"10%"}>Numero</Table.Th>
                            <Table.Th w={"80%"}>Progresso</Table.Th>
                            <Table.Th w={60} />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {DownloadStore.anime
                            .get(titolo)
                            .lista.values()
                            .toArray()
                            .map((lista) => {
                                return (
                                    <DownloadInfoEntry
                                        key={lista.episodio.numero}
                                        titolo={titolo}
                                        numero={lista.episodio.numero}
                                        download={lista.Download}
                                    />
                                );
                            })}
                    </Table.Tbody>
                </Table>
            </>
        );
    }
});

export default DownloadInfo;

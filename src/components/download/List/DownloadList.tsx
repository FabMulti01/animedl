import { Stack, Table, Text, Title } from "@mantine/core";
import { observer } from "mobx-react-lite";
import DownloadStore from "@stores/DownloadStore.js";
import DownloadListEntry from "./DownloadListEntry.js";

const DownloadList = observer(() => {
    if (DownloadStore.anime.size == 0) {
        return (
            <>
                <Title>Lista Download</Title>
                <Stack h={"100%"} align="center" justify="center">
                    <Text>La lista dei download é vuota...</Text>
                </Stack>
            </>
        );
    } else {
        return (
            <>
                <Title>Lista Download</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th w={"auto"}>Nome</Table.Th>
                            <Table.Th w={170}>Sito</Table.Th>
                            <Table.Th w={60} />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {DownloadStore.anime
                            .keys()
                            .toArray()
                            .map((key) => {
                                return (
                                    <DownloadListEntry
                                        episodioStore={DownloadStore.anime.get(
                                            key
                                        )}
                                        titolo={key}
                                        key={key}
                                    />
                                );
                            })}
                    </Table.Tbody>
                </Table>
            </>
        );
    }
});

export default DownloadList;

import { Text, Table, Group, Progress } from "@mantine/core";
import { observer } from "mobx-react-lite";
import DownloadInfoStateButtons from "./DownloadInfoStateButtons.js";
import type Download from "@classes/download/Download.js";
import formatBytes from "@functions/formatBytes.js";

const DownloadInfoEntry = observer(
    ({
        titolo,
        numero,
        download,
    }: {
        titolo: string;
        numero: string;
        download: Download;
    }) => {
        return (
            <Table.Tr>
                <Table.Td>
                    <Text size="sm" lineClamp={1}>
                        {numero}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Progress value={download.percentuale} size={"xl"} />
                    <Group justify="space-between">
                        <Text>
                            Velocità: {formatBytes(download.velocita)}/s
                        </Text>
                        <Text>
                            {formatBytes(download.scaricato)} su{" "}
                            {formatBytes(download.peso)}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <DownloadInfoStateButtons
                        titolo={titolo}
                        numero={numero}
                        stato={download.stato}
                        stream={download.stream}
                    />
                </Table.Td>
            </Table.Tr>
        );
    }
);

export default DownloadInfoEntry;

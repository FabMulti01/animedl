import formatBytes from "@functions/formatBytes";
import { Table, Title, Text, Badge, HoverCard } from "@mantine/core";
import { Impostazioni } from "@stores/Impostazioni";

const Scaricato = () => {
    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Title order={4}>Totale Scaricato</Title>
                    <Text>Mostra il totale scaricato dall'applicazione</Text>
                </Table.Td>
                <Table.Td>
                    <HoverCard shadow="md">
                        <HoverCard.Target>
                            <Badge
                                fullWidth
                                variant="outline"
                                radius="md"
                                size="xl"
                            >
                                {formatBytes(Impostazioni.downloadedBytes)}
                            </Badge>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Text size="sm">
                                Il totale viene calcolato solo al termine del
                                download
                            </Text>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Table.Td>
            </Table.Tr>
        </>
    );
};

export default Scaricato;

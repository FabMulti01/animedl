import { Table, Title, Text, Button } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

const Segnala = () => {
    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Segnala</Title>
                <Text>
                    Segnala un'anomalia che hai riscontrato mentre usavi l'app
                </Text>
            </Table.Td>
            <Table.Td>
                <Button
                    fullWidth
                    title="Apre la pagina delle issues di GitHub"
                    onClick={() =>
                        window.browser.open(
                            "https://github.com/FabMulti01/animedl/issues/new"
                        )
                    }
                >
                    {<IconSend />}
                </Button>
            </Table.Td>
        </Table.Tr>
    );
};

export default Segnala;

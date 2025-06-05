import { Table, Title, Text, Button } from "@mantine/core";
import { IconProgressCheck } from "@tabler/icons-react";
import Update from "@components/update/Update";

const Aggiorna = () => {
    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Aggiorna</Title>
                <Text>Verifica se ci sono aggiornamenti</Text>
            </Table.Td>
            <Table.Td>
                <Button onClick={Update.check} fullWidth>
                    <IconProgressCheck />
                </Button>
            </Table.Td>
        </Table.Tr>
    );
};

export default Aggiorna;

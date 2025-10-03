import { Badge, Table, Text, Title } from "@mantine/core";
import { Impostazioni } from "@stores/Impostazioni";
import { useState } from "react";

const VerificaAggiornamento = () => {
    const [verifica, setVerifica] = useState(Impostazioni.checkForUpdate);
    function handleVerifica() {
        setVerifica(!verifica);
        Impostazioni.checkForUpdate = !verifica;
    }

    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Verifica aggiornamenti</Title>
                <Text>
                    Controlla se ci sono aggiornamenti all'avvio dell'app
                </Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    fullWidth
                    radius="md"
                    size="xl"
                    onClick={handleVerifica}
                    style={{ cursor: "pointer" }}
                    color={verifica ? "green" : "red"}
                >
                    {verifica ? "Si" : "No"}
                </Badge>
            </Table.Td>
        </Table.Tr>
    );
};

export default VerificaAggiornamento;

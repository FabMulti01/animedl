import { useState } from "react";
import { Impostazioni } from "@stores/Impostazioni";
import { Button, Table, TextInput, Title, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Cartella = () => {
    const [cartella, setCartella] = useState(Impostazioni.downloadDir);
    function handleCartella() {
        window.folder.select().then((dir) => {
            if (dir != null) {
                setCartella(dir);
                Impostazioni.downloadDir = dir;
            }
        });
    }
    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Cartella di download</Title>
                <TextInput
                    readOnly
                    value={cartella}
                    onDoubleClick={handleCartella}
                />
                <Text>
                    Nella cartella selezionata verranno create le cartelle degli
                    anime
                </Text>
            </Table.Td>
            <Table.Td>
                <Button
                    fullWidth
                    onClick={handleCartella}
                    leftSection={<IconSearch />}
                >
                    Sfoglia
                </Button>
            </Table.Td>
        </Table.Tr>
    );
};

export default Cartella;

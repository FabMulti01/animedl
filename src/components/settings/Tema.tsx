import { useState } from "react";
import {
    Table,
    Title,
    Text,
    Select,
    useMantineColorScheme,
    type MantineColorScheme,
} from "@mantine/core";
import { Impostazioni } from "@stores/Impostazioni";

const Tema = () => {
    const [tema, setTema] = useState(Impostazioni.tema);
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });

    function handleTema(tema: MantineColorScheme) {
        setTema(tema);
        setColorScheme(tema);
        Impostazioni.tema = tema;
    }

    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Tema</Title>
                <Text>Cambia il tema dell'applicazione</Text>
            </Table.Td>
            <Table.Td>
                <Select
                    data={[
                        { label: "Scuro", value: "dark" },
                        { label: "Chiaro", value: "light" },
                        { label: "Sistema", value: "auto" },
                    ]}
                    defaultValue={tema}
                    allowDeselect={false}
                    onChange={(value) =>
                        handleTema(value as MantineColorScheme)
                    }
                />
            </Table.Td>
        </Table.Tr>
    );
};

export default Tema;

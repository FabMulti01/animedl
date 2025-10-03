import { Box, Button, Table, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Cartella from "./Cartella.js";
import Tema from "./Tema.js";
import Reset from "./Reset.js";
import Informazioni from "./Informazioni.js";
import Scaricato from "./Scaricato.js";
import Segnala from "./Segnala.js";
import { modals } from "@mantine/modals";
import Aggiorna from "./Aggiorna.js";
import VerificaAggiornamento from "./VerificaAggiornamenti.js";

const Settings = () => {
    return (
        <Box>
            <Title>Impostazioni</Title>
            <Table w={"100%"} captionSide="bottom">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={"90%"} />
                        <Table.Th w={"10%"} />
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Cartella />
                    <Tema />
                    <Scaricato />
                    <VerificaAggiornamento />
                    <Aggiorna />
                    <Segnala />
                    <Reset />
                </Table.Tbody>
                <Table.Caption>
                    <Button
                        onClick={() =>
                            modals.open({
                                title: "Informazioni",
                                children: <Informazioni />,
                                centered: true,
                            })
                        }
                        rightSection={<IconInfoCircle />}
                    >
                        v{window.app.appVersion()}
                    </Button>
                </Table.Caption>
            </Table>
        </Box>
    );
};

export default Settings;

import React from "react";
import { ipcRenderer } from "electron";
import { Text, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalConferma } from "./ModalConferma";
import { AnimeDLEvents } from "@/types/AnimeDLEvents";

export const Aggiorna: React.FC = () => {
    const [opened, { open, close }] = useDisclosure(false);

    ipcRenderer.on("updateDisponibile", () => {
        open();
    });

    ipcRenderer.on("updateNonDisponibile", () => {
        AnimeDLEvents.notifica(
            "Info",
            "Nessun aggiornamento disponibile per l'applicazione!"
        );
    });

    return (
        <>
            <ModalConferma close={close} opened={opened} />
            <tr>
                <td>
                    <Title order={3}>Aggiorna</Title>
                    <Text>
                        Controlla se ci sono aggiornamenti disponibili per
                        l'appicazione, se si chiude l'applicazione durante
                        l'aggiornamento bisogna re-iniziare a scaricarlo da zero
                    </Text>
                </td>
                <td>
                    <Button
                        fullWidth
                        onClick={() => {
                            ipcRenderer.invoke("checkUpdate");
                        }}
                    >
                        Controlla aggiornamenti
                    </Button>
                </td>
            </tr>
        </>
    );
};

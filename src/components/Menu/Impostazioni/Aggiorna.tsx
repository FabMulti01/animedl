import React from "react";
import { ipcRenderer } from "electron";
import { Text, Button, Title } from "@mantine/core";

import { AnimeDL } from "@/types/AnimeDL";
import { constants } from "@/utils";

export const Aggiorna: React.FC = () => {
    ipcRenderer.on("updateDisponibile", () => {
        AnimeDL.conferma(
            "Aggiorna!",
            "É disponibile un aggiornamento dell'applicazione. Vuoi aprire la pagina di GitHub?",
            () => ipcRenderer.invoke("apriBrowser", constants.Repository)
        );
    });

    ipcRenderer.on("updateInfo", (event, messaggio) => {
        AnimeDL.notifica("Info", messaggio);
    });

    return (
        <>
            <tr>
                <td>
                    <Title order={3}>Aggiorna</Title>
                    <Text>
                        Controlla se ci sono aggiornamenti disponibili per
                        l'applicazione. In caso siano presenti viene aperto un
                        messaggio di pop-up per aprire la pagina delle release
                        di GitHub
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

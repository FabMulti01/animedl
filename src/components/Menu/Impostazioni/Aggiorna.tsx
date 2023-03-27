import React from "react";
import { ipcRenderer } from "electron";
import { Text, Button, Title } from "@mantine/core";

export const Aggiorna: React.FC = () => {
    return (
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
    );
};

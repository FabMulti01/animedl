//import { ipcRenderer } from "electron";
import React from "react";
import { Text, Button, Title } from "@mantine/core";
import { ipcRenderer } from "electron";

export const Segnala: React.FC = () => {
    return (
        <tr>
            <td>
                <Title order={3}>Segnala un problema</Title>
                <Text>Se vuoi segnalare un problema, clicca il bottone!</Text>
            </td>
            <td>
                <Button
                    fullWidth
                    onClick={() => {
                        ipcRenderer.invoke(
                            "apriBrowser",
                            "https://github.com/FabMulti01/animedl/issues"
                        );
                    }}
                >
                    Segnala
                </Button>
            </td>
        </tr>
    );
};

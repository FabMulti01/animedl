//import { ipcRenderer } from "electron";
import React from "react";
import { Text, Button, Title } from "@mantine/core";
import { ipcRenderer } from "electron";

export const Feedback: React.FC = () => {
    return (
        <tr>
            <td>
                <Title order={3}>Feedback</Title>
                <Text>
                    Se vuoi lasciare un Feedback oppure segnalare un problema,
                    Textclicca il bottone!
                </Text>
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
                    Lascia un Feedback
                </Button>
            </td>
        </tr>
    );
};

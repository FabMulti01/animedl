//import { ipcRenderer } from "electron";
import React from "react";
import { Text, Title, Badge } from "@mantine/core";
import { getTotaleScaricato } from "@/types/UserSettings";
import { formatBytes } from "@/utils";

export const TotaleScaricato: React.FC = () => {
    return (
        <tr>
            <td>
                <Title order={3}>Totale Scaricato</Title>
                <Text>Da quando hai installato AnimeDL hai scaricato:</Text>
            </td>
            <td>
                <Badge radius="md" fullWidth size="xl">
                    {formatBytes(getTotaleScaricato())}
                </Badge>
            </td>
        </tr>
    );
};

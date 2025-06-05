import formatBytes from "@functions/formatBytes";
import { Card, Group, Progress, Text } from "@mantine/core";
import { ipcRenderer } from "electron";
import type { ProgressInfo } from "electron-updater";
import { useEffect, useState } from "react";
import Update from "./Update";

const UpdateModalBody = () => {
    const [percentuale, setPercentuale] = useState(0);
    const [velocita, setVelocita] = useState(0);
    const [peso, setPeso] = useState(0);
    const [scaricato, setScaricato] = useState(0);
    useEffect(() => {
        ipcRenderer.on("downloadProgress", (_e, info: ProgressInfo) => {
            setPercentuale(info.percent);
            setVelocita(info.bytesPerSecond);
            setPeso(info.total);
            setScaricato(info.transferred);
        });
        ipcRenderer.on("downloadCompleted", () => {
            Update.install();
        });
        ipcRenderer.on("downloadError", (_e, error: string) => {
            Update.error(error);
        });
    }, []);
    return (
        <Card>
            <Progress value={percentuale} />
            <Group justify="space-between">
                <Text size="sm">Velocità:{formatBytes(velocita)}/s</Text>
                <Text size="sm">
                    {formatBytes(scaricato)}/{formatBytes(peso)}
                </Text>
            </Group>
        </Card>
    );
};

export default UpdateModalBody;

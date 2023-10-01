import { ipcRenderer } from "electron";
import React from "react";
import { setDownloadDir } from "@/types/UserSettings";
import { TextInput, Title, Text, Button } from "@mantine/core";
import { VscFolderOpened } from "react-icons/vsc";

type props = {
    setDirectory(Directory: string);
    Directory: string;
};

export const Cartella: React.FC<props> = ({ setDirectory, Directory }) => {
    function directoryHandler() {
        ipcRenderer.invoke("selectDir").then((dir) => {
            Directory = dir;
            if (Directory != undefined) {
                setDownloadDir(Directory);
                setDirectory(Directory);
            }
        });
    }

    return (
        <tr>
            <td>
                <Title order={3}>Cartella di download</Title>
                <TextInput
                    readOnly
                    onDoubleClick={directoryHandler}
                    value={Directory}
                    title={Directory}
                />
                <Text>
                    Nella cartella selezionata verranno create anche le cartelle
                    dei vari anime scaricati
                </Text>
            </td>
            <td>
                <Button
                    top={6}
                    fullWidth
                    leftIcon={<VscFolderOpened />}
                    onClick={directoryHandler}
                >
                    Sfoglia...
                </Button>
            </td>
        </tr>
    );
};

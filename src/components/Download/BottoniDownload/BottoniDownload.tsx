//I bottoni che vengono visualizzati in ogni episodio
import React from "react";
import { DownloaderHelper } from "node-downloader-helper";
import { Button } from "@mantine/core";
import {
    VscDebugPause,
    VscDebugStart,
    VscDebugStop,
    VscFolder,
    VscTrash,
} from "react-icons/vsc";
import { ipcRenderer } from "electron";
import { AnimeStore } from "@/stores/AnimeStore";

interface props {
    stream: DownloaderHelper;
    setColore(colore: string): void;
    setAnimate(a: boolean): void;
}

export const Riprendi: React.FC<props> = ({
    stream,
    setColore,
    setAnimate,
}) => {
    return (
        <Button
            onClick={() => {
                stream.resume();
                setColore("cyan");
                setAnimate(true);
            }}
        >
            <VscDebugStart />
        </Button>
    );
};

export const Pausa: React.FC<props> = ({ stream, setColore, setAnimate }) => {
    return (
        <Button
            onClick={() => {
                stream.pause();
                setColore("yellow");
                setAnimate(false);
            }}
        >
            <VscDebugPause />
        </Button>
    );
};

export const Stop: React.FC<props> = ({ stream, setColore, setAnimate }) => {
    return (
        <Button
            onClick={() => {
                stream.stop();
                setColore("red");
                setAnimate(false);
            }}
        >
            <VscDebugStop />
        </Button>
    );
};

export const Rimuovi: React.FC<{
    nome: string;
    numero: string;
}> = ({ nome, numero }) => {
    return (
        <Button
            onClick={() => {
                AnimeStore.removeEpisodio(nome, numero);
            }}
        >
            <VscTrash />
        </Button>
    );
};

export const Cartella: React.FC<{ cartella: string }> = ({ cartella }) => {
    return (
        <Button
            onClick={() => {
                ipcRenderer.invoke("openDir", cartella);
            }}
        >
            <VscFolder />
        </Button>
    );
};

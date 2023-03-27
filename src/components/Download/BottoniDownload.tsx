//Pagina per i bottoni che stoppano/riprendono/pausano il download dell'anime
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
import Episodio from "@/types/Episodio";

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

export const Rimuovi: React.FC<{ episodio: Episodio }> = ({ episodio }) => {
    return (
        <Button
            onClick={() => {
                episodio.removeEpisodio();
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

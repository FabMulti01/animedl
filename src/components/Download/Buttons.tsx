import { DownloaderHelper } from "node-downloader-helper";
import React from "react";
import {
    VscDebugPause,
    VscDebugStart,
    VscDebugStop,
    VscFolderOpened,
    VscTrash,
} from "react-icons/vsc";
//Store per il comando per eliminare il download dalla lista
import { DownloadStore } from "../../stores/Download";
//Electron per aprire la cartella dove viene salvato l'anime
import { ipcRenderer } from "electron";

interface stream {
    stream?: DownloaderHelper;
    link?: string;
    directory?: string;
}

//Bottoni
export const Pausa: React.FC<stream> = ({ stream }) => {
    return (
        <button
            onClick={() => {
                stream.pause();
            }}
            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
        >
            <VscDebugPause />
        </button>
    );
};

export const Riprendi: React.FC<stream> = ({ stream }) => {
    return (
        <button
            onClick={() => {
                stream.resume();
            }}
            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
        >
            <VscDebugStart />
        </button>
    );
};

export const Stop: React.FC<stream> = ({ stream }) => {
    return (
        <button
            onClick={() => {
                stream.stop();
            }}
            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
        >
            <VscDebugStop />
        </button>
    );
};

export const Rimuovi: React.FC<stream> = ({ link }) => {
    return (
        <button
            onClick={() => DownloadStore.removeDownload(link)}
            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
        >
            <VscTrash />
        </button>
    );
};

export const OpenFolder: React.FC<stream> = ({ directory }) => {
    return (
        <button
            onClick={() => ipcRenderer.invoke("openDirectory", directory)}
            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
        >
            <VscFolderOpened />
        </button>
    );
};

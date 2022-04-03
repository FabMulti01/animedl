import { ipcRenderer } from "electron";
import React, { useState } from "react";
import {
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeClose,
    VscArrowLeft,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ExitCheck from "../../addons/exitcheck";

export const Titlebar: React.FC = () => {
    const navigate = useNavigate();
    const [maximized, isMaximized] = useState(false);

    function handleMinimize() {
        ipcRenderer.invoke("minimize");
    }

    function handleMaximize() {
        if (maximized) {
            ipcRenderer.invoke("restore");
        } else {
            ipcRenderer.invoke("maximize");
        }
        isMaximized(!maximized);
    }

    return (
        <React.Fragment>
            <div className="flex flex-row bg-cyan-700 drag w-full shadow-sm shadow-black">
                <div className="text-left w-1/2">
                    {/* Indietro */}
                    <button
                        title="Torna indietro"
                        onClick={() => navigate(-1)}
                        className="no-drag h-8 w-10 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
                    >
                        <VscArrowLeft />
                    </button>
                </div>
                <h2 className="font-semibold text-2xl">AnimeDL</h2>
                <div className="text-right w-1/2">
                    {/* Minimizza */}
                    <button
                        title="Minimizza"
                        onClick={handleMinimize}
                        className="no-drag h-8 w-10 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto"
                    >
                        <VscChromeMinimize />
                    </button>
                    {/* Maximizza */}
                    <button
                        title="Ingrandisci/Resetta"
                        onClick={handleMaximize}
                        className="no-drag h-8 w-10 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto"
                    >
                        <VscChromeMaximize />
                    </button>
                    {/* Chiudi */}
                    <button
                        title="Chiudi"
                        onClick={ExitCheck}
                        className="no-drag h-8 w-10 hover:bg-red-700 active:bg-red-600 hover:text-white duration-200"
                    >
                        <VscChromeClose />
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

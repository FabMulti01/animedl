import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Collapse, UnmountClosed } from "react-collapse";
import { ipcRenderer } from "electron";
import { DownloadList } from "../Download/DownloadList";
import { Settings } from "./Settings";
import json from "../../../package.json";

export const Sidenav = observer(() => {
    const [settings, showSettings] = useState(false);
    const [downloads, showDownloads] = useState(false);

    function showHandler(selezione: Number) {
        //Le chiudo tutte prima di mostrarne un'altra
        showSettings(false);
        showDownloads(false);
        switch (selezione) {
            case 0:
                showSettings(!settings);
                break;

            case 1:
                showDownloads(!downloads);
                break;

            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <div className="text-white h-full bg-neutral-800 w-44 shadow-sm shadow-black">
                <div className="text-center pt-4">
                    <button
                        onClick={() => showHandler(0)}
                        className="w-36 mt-2 p-2 bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500 duration-200 m-auto disabled:active:bg-cyan-600 hover:text-black rounded"
                    >
                        Impostazioni
                    </button>
                    <button
                        onClick={() => showHandler(1)}
                        className="w-36 mt-2 p-2 bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500 duration-200 m-auto disabled:active:bg-cyan-600 hover:text-black rounded"
                    >
                        Downloads
                    </button>
                </div>
                <div className="bottom-0 text-center absolute pb-4 w-44">
                    Versione:{" "}
                    <button
                        className="font-semibold text-red-700"
                        onClick={() =>
                            ipcRenderer.invoke("apriBrowser", json.homepage)
                        }
                        title="Apri pagina GitHub"
                    >
                        {json.version}
                    </button>
                </div>
            </div>
            <div className="absolute left-44 maxAltezza larghezza overflow-hidden">
                <Collapse isOpened={settings || downloads}>
                    <UnmountClosed isOpened={settings}>
                        <Settings />
                    </UnmountClosed>
                    <Collapse isOpened={downloads}>
                        <DownloadList />
                    </Collapse>
                    <div
                        className="h-screen w-full left-44 bg-neutral-600 opacity-50"
                        onClick={() => showHandler(2)}
                    >
                        {/* e per mostrare la parte grigia in basso */}
                        <p className="text-neutral-600 select-none">.</p>
                    </div>
                </Collapse>
            </div>
        </React.Fragment>
    );
});

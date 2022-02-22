import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { DownloadInfo } from "../../stores/Download";
import { DownloadItem } from "./DownloadItem";

interface DownloadAnime {
    download: DownloadInfo;
}
//Il contenitore degli episodi di un Anime
export const DownloadAnime: React.FC<DownloadAnime> = observer(
    ({ download }) => {
        const [open, setOpen] = useState(true);
        return (
            <div className="w-full bg-cyan-800">
                <div className="flex">
                    <div className="w-1/2">
                        <h2 className="font-semibold text-xl">
                            {download.nome}
                        </h2>
                    </div>
                    <div className="w-1/2">
                        <button
                            className="h-full w-6 hover:bg-cyan-600 active:bg-cyan-500 hover:text-white duration-200 m-auto disabled:active:bg-cyan-600"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <VscChevronUp /> : <VscChevronDown />}
                        </button>
                    </div>
                </div>
                <Collapse isOpened={open}>
                    {download.episodio.map((episodio, i) => {
                        //Se l'episodio e' nullo non lo stampo
                        if (episodio !== null) {
                            return (
                                <DownloadItem
                                    key={i}
                                    episodio={episodio}
                                    directory={download.dir}
                                    nome={download.nome}
                                />
                            );
                        }
                    })}
                </Collapse>
            </div>
        );
    }
);

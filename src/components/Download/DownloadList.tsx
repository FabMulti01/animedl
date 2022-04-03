import React from "react";
import { observer } from "mobx-react";

import { DownloadAnime } from "./DownloadAnime";
import { DownloadStore } from "../../stores/Download";

export const DownloadList: React.FC = observer(() => {
    return (
        <div className="w-full h-full bg-cyan-900 overflow-auto pt-2">
            <h2 className="font-bold text-2xl text-center">Lista Download</h2>
            {DownloadStore.download.length > 0 ? (
                DownloadStore.download.map((download, i) => {
                    if (download !== null) {
                        return <DownloadAnime key={i} download={download} />;
                    }
                })
            ) : (
                <div className="font-bold text-2xl text-center pb-2">
                    <h2>Nessun download attivo!</h2>
                    <h3>Scarica qualcosa da AnimeWorld</h3>
                </div>
            )}
        </div>
    );
});

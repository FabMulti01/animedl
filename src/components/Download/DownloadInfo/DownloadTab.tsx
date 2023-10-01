import React from "react";
import { observer } from "mobx-react";
import type { EpisodioStore } from "@/stores/EpisodioStore";
import { DownloadCompletati } from "./DownloadCompletati";
import { DownloadInCorso } from "./DownloadInCorso";
import { DownloadStoppati } from "./DownloadStoppati";

export const DownloadTab: React.FC<{ Anime: EpisodioStore }> = observer(
    ({ Anime }) => {
        return (
            <>
                {Anime.inDownload > 0 ? (
                    <DownloadInCorso Anime={Anime} />
                ) : (
                    <></>
                )}
                {Anime.completati > 0 ? (
                    <DownloadCompletati Anime={Anime} />
                ) : (
                    <></>
                )}
                {Anime.stoppati > 0 ? (
                    <DownloadStoppati Anime={Anime} />
                ) : (
                    <></>
                )}
            </>
        );
    }
);

//Entry nella lista download
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import type Episodio from "@/types/Episodio";
import * as Bottone from "./BottoniDownload";
import { Progressbar } from "./Progressbar";
import { Text, Button } from "@mantine/core";
import { Group, MantineColor } from "@mantine/core";
import { DH_STATES } from "node-downloader-helper";

type EpisodeItem = {
    episodio: Episodio;
};

export const DownloadEpisodeItem: React.FC<EpisodeItem> = observer((props) => {
    const { episodio } = props;
    const [colore, setColore] = useState<MantineColor>("cyan");
    const [animate, setAnimate] = useState<boolean>(true);

    useEffect(() => {
        setColore(progressbarHandler(episodio.stato).colore);
        setAnimate(progressbarHandler(episodio.stato).animate);
    }, []);

    return (
        <tr>
            <td>Episodio: {episodio.numero}</td>
            <td>
                <Progressbar
                    color={colore}
                    percentuale={episodio.percentuale}
                    animate={animate}
                />
                <Group>
                    <Text>Peso: {episodio.pesoTotale}</Text>
                    <Text>
                        {/* Se il download é terminato/stoppato non mostro la velocita */}
                        {episodio.velocita != "NaN/S" ? episodio.velocita : ""}
                    </Text>
                </Group>
            </td>
            <td>
                <Button.Group>
                    {episodio.stato === DH_STATES.FINISHED ||
                    episodio.stato === DH_STATES.STOPPED ||
                    episodio.stato === DH_STATES.FAILED ? (
                        //Se e completato mi mette il bottone per aprire la cartella
                        episodio.stato === DH_STATES.FINISHED ? (
                            <>
                                <Bottone.Cartella
                                    cartella={episodio.cartella}
                                />
                                <Bottone.Rimuovi episodio={episodio} />
                            </>
                        ) : (
                            <Bottone.Rimuovi episodio={episodio} />
                        )
                    ) : episodio.stato === DH_STATES.PAUSED ? (
                        <>
                            <Bottone.Riprendi
                                stream={episodio.stream}
                                setColore={setColore}
                                setAnimate={setAnimate}
                            />
                            <Bottone.Stop
                                stream={episodio.stream}
                                setColore={setColore}
                                setAnimate={setAnimate}
                            />
                        </>
                    ) : (
                        <>
                            <Bottone.Pausa
                                stream={episodio.stream}
                                setColore={setColore}
                                setAnimate={setAnimate}
                            />
                            <Bottone.Stop
                                stream={episodio.stream}
                                setColore={setColore}
                                setAnimate={setAnimate}
                            />
                        </>
                    )}
                </Button.Group>
            </td>
        </tr>
    );
});

function progressbarHandler(stato: DH_STATES) {
    switch (stato) {
        case DH_STATES.DOWNLOADING: {
            return { colore: "cyan", animate: true };
        }
        case DH_STATES.PAUSED: {
            return { colore: "yellow", animate: false };
        }
        case DH_STATES.STOPPED: {
            return { colore: "red", animate: false };
        }
        case DH_STATES.FAILED: {
            return { colore: "violet", animate: false };
        }
        default: {
            return { colore: "cyan", animate: true };
        }
    }
}

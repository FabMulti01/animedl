//Entry nella lista download
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import * as Bottone from "@/components/Download/BottoniDownload/BottoniDownload";
import { Progressbar } from "../Progressbar";
import { Text, Button } from "@mantine/core";
import { Group, MantineColor } from "@mantine/core";
import { DH_STATES } from "node-downloader-helper";
import { formatBytes } from "@/utils";
import Episodio from "@/types/Episodio";

type EpisodeItem = {
    episodio: Episodio;
    nome: string;
    cartella: string;
};

export const DownloadEpisodeItem: React.FC<EpisodeItem> = observer((props) => {
    const { episodio, nome, cartella } = props;
    const [colore, setColore] = useState<MantineColor>();
    const [animate, setAnimate] = useState<boolean>();

    useEffect(() => {
        setColore(progressbarHandler(episodio.stato).colore);
        setAnimate(progressbarHandler(episodio.stato).animate);
        //Non posso aggiornare il componente da fuori
        //Quindi devo mettere il listerer qui
        episodio.stream.on("end", () => {
            setAnimate(false);
        });
    }, []);

    return (
        <tr>
            <td>Episodio: {episodio.numero}</td>
            <td>
                <Progressbar
                    title={episodio.stato}
                    color={colore}
                    percentuale={episodio.percentuale}
                    animate={animate}
                />
                <Group>
                    <Text w={"30%"}>
                        Peso: {formatBytes(episodio.pesoTotale)}
                    </Text>
                    {episodio.velocita != 0 ? (
                        <>
                            <Text w={"30%"}>
                                Scaricato: {formatBytes(episodio.scaricato, 0)}
                            </Text>
                            <Text w={"30%"}>
                                {formatBytes(episodio.velocita) + "/S"}
                            </Text>
                        </>
                    ) : (
                        <></>
                    )}
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
                                <Bottone.Cartella cartella={cartella} />
                                <Bottone.Rimuovi
                                    nome={nome}
                                    numero={episodio.numero}
                                />
                            </>
                        ) : (
                            <Bottone.Rimuovi
                                nome={nome}
                                numero={episodio.numero}
                            />
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
        case DH_STATES.FINISHED: {
            return { colore: "cyan", animate: false };
        }
        case DH_STATES.FAILED: {
            return { colore: "violet", animate: false };
        }
        default: {
            return { colore: "cyan", animate: true };
        }
    }
}

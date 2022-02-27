import React, { useEffect, useState } from "react";
//Interfaccia Episodio
import { Episodio } from "../../stores/Download";
//Mostra una notifica desktop ogni volta che inizia/finisce un download
import { Notifica } from "../../addons/Notifications";
//Bottoni per controllare il download
import * as Bottone from "./Buttons";
import { getEpisodeDownloadLink } from "../../search/AW/AWMethods";
import { DownloaderHelper } from "node-downloader-helper";

enum COLORE {
    ERRORE = "#de0000",
    STOPPATO = "#de0000",
    COMPLETATO = "#0e7490",
    SCARICAMENTO = "#0d9431",
    PAUSA = "#dea300",
}

enum STATO {
    ERRORE = "Errore",
    STOPPATO = "Stoppato",
    COMPLETATO = "Completato",
    SCARICAMENTO = "Scaricamento",
    AVVIO = "Avvio...",
    PAUSA = "Pausa",
}

interface IDownloadItem {
    episodio: Episodio;
    directory: string;
    nome: string;
}

export const DownloadItem: React.FC<IDownloadItem> = ({
    episodio,
    directory,
    nome,
}) => {
    const [loading, setLoading] = useState(true);
    //Informazioni del download
    const [pesoTotale, setPesoTotale] = useState<string>();
    const [percentuale, setPercentuale] = useState<string>();
    const [velocita, setVelocita] = useState<string>();
    //Stati del download
    const [colore, setColore] = useState<COLORE>();
    const [stato, setStato] = useState<STATO>(STATO.AVVIO);
    const [stream, setStream] = useState<DownloaderHelper>();

    useEffect(() => {
        setLoading(true);
        const loadStream = async () => {
            const link = await getEpisodeDownloadLink(episodio.id);
            setStream(new DownloaderHelper(link, directory));
            setLoading(false);
        };
        loadStream();
    }, []);

    useEffect(() => {
        if (!loading) {
            stream.start();
            stream.on("download", (stats) => {
                Notifica(
                    nome,
                    "Episodio: " + episodio.numero + " aggiunto ai download"
                );
                setPesoTotale(formatBytes(stats.totalSize, 1));
                setStato(STATO.SCARICAMENTO);
                setColore(COLORE.SCARICAMENTO);
            });
            stream.on("progress", (stats) => {
                setPercentuale(stats.progress.toFixed(1));
                setVelocita(formatBytes(stats.speed, 1) + "/S");
            });
            stream.on("pause", () => {
                setColore(COLORE.PAUSA);
                setVelocita("PAUSA");
                setStato(STATO.PAUSA);
            });
            stream.on("resume", () => {
                setColore(COLORE.SCARICAMENTO);
                setStato(STATO.SCARICAMENTO);
            });
            stream.on("stop", () => {
                setColore(COLORE.STOPPATO);
                setVelocita("STOPPATO");
                setStato(STATO.STOPPATO);
                episodio.finito = true;
            });
            stream.on("end", (stats) => {
                if (stats.incomplete) {
                    setColore(COLORE.ERRORE);
                    setVelocita("FINITO");
                    setStato(STATO.ERRORE);
                    episodio.finito = true;
                } else {
                    setColore(COLORE.COMPLETATO);
                    setStato(STATO.COMPLETATO);
                    episodio.finito = true;
                    Notifica(
                        nome,
                        "Episodio: " + episodio.numero + " e stato scaricato!",
                        directory
                    );
                }
            });
        }
    }, [loading]);

    return (
        <div className="text=center pt-2 w-full">
            <div className="w-full flex">
                <div className="w-1/2">
                    <h2 className="font-semibold text-left">
                        Episodio: {episodio.numero}
                    </h2>
                </div>
                <div className="font-semibold text-left w-1/2">
                    <div className="w-full flex">
                        <div className="w-1/2">
                            <h2>Peso Totale: {pesoTotale}</h2>
                        </div>
                        {stato === STATO.COMPLETATO ||
                        stato === STATO.ERRORE ? (
                            <></>
                        ) : (
                            <div className="w-1/2">
                                <h2>Velocita: {velocita}</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="h-6 bg-neutral-600 w-full">
                    <h3 className="float-left">
                        {stato}: {percentuale}%
                    </h3>
                    <span className="float-right w-auto h-full">
                        {stato === STATO.COMPLETATO ||
                        stato === STATO.ERRORE ||
                        stato === STATO.STOPPATO ? (
                            //Se e completato mi mette il bottone per aprire la cartella
                            stato === STATO.COMPLETATO ? (
                                <React.Fragment>
                                    <Bottone.OpenFolder directory={directory} />
                                    <Bottone.Rimuovi link={episodio.id} />
                                </React.Fragment>
                            ) : (
                                <Bottone.Rimuovi link={episodio.id} />
                            )
                        ) : stato === STATO.PAUSA ? (
                            <React.Fragment>
                                <Bottone.Riprendi stream={stream} />
                                <Bottone.Stop stream={stream} />
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Bottone.Pausa stream={stream} />
                                <Bottone.Stop stream={stream} />
                            </React.Fragment>
                        )}
                    </span>
                    <div
                        style={{
                            backgroundColor: colore,
                            width: percentuale + "%",
                        }}
                        className="h-6"
                    ></div>
                </div>
            </div>
        </div>
    );
};

//https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
function formatBytes(bytes: number, decimal: number): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(decimal)) + sizes[i];
}

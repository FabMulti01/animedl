import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AW } from "../../../search/AW/AW";
import { infoAnime } from "../../../search/AW/AWMethods";
import { DownloadStore } from "../../../stores/Download";

export const AWInfo: React.FC = observer(() => {
    const [loading, setLoading] = useState(true);
    const [Anime, setAnime] = useState<AW>(useLocation().state as AW);
    const [specifico, setSpecifico] = useState(0);
    const [cercato, setCercato] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        const getAW = async () => {
            const anime = await infoAnime(Anime);
            if (loading) {
                setAnime(anime);
                setLoading(false);
            } else {
                console.log("Caricamento delle informazioni annullato!");
            }
        };
        getAW();
        return () => {
            setLoading(false);
        };
    }, []);

    function episodioSpecificoHandler(numero: number) {
        if (numero < Anime.episodio.length + 1 && numero > 0) {
            for (var i = 0; i < Anime.episodio.length; i++) {
                if (Anime.episodio[i].numerino.includes(numero.toString())) {
                    setSpecifico(i);
                    setCercato(numero);
                    return;
                }
            }
            //Non funziona bene, se cerco un episodio enorme non controlla
            //Che il numero cercato sia lo stesso del numerino
            //Pero mostra l'ultimo elemento dell'array
        } else if (numero > Anime.episodio.length) {
            setSpecifico(Anime.episodio.length - 1);
            setCercato(Anime.episodio.length + 1);
        } else {
            setCercato(0);
        }
    }

    if (loading) {
        return (
            <div className="py-7 text-center w-full">
                <h2 className="text-3xl text-white pb-3">
                    Caricamento informazioni per {Anime.nome}
                </h2>
                <h3 className="text-2xl text-neutral-400">Attendi...</h3>
            </div>
        );
    }

    return (
        <div className="py-3 text-center w-auto">
            <h2 className="font-semibold text-2xl text-white py-4">
                {Anime.nome}
            </h2>
            <div className="m-auto flex">
                <div className="w-56 h-auto">
                    <img className="rounded w-56 h-80" src={Anime.immagine} />
                    <table className="w-full text-white">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Stato: </td>
                                <td>{Anime.stato}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Data: </td>
                                <td>{Anime.dataInizio}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold">
                                    Numero Episodi:
                                </td>
                                {Anime.episodio.length === 0 ? (
                                    <td>Non disponibile</td>
                                ) : (
                                    <td>{Anime.episodio.length}</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                    {Anime.episodio.length !== 0 ? (
                        Anime.episodio.length > 50 ? (
                            <div className="w-full text-center pt-3">
                                <h3 className="font-semibold text-lg text-white">
                                    Cerca episodio specifico
                                </h3>
                                <input
                                    placeholder="Inserire numero..."
                                    type="number"
                                    value={cercato === 0 ? "" : cercato}
                                    onChange={(e) =>
                                        episodioSpecificoHandler(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="cursor-text p-2 text-black rounded-xl"
                                ></input>
                                {cercato === 0 ? (
                                    <div className="text-center">
                                        <h3 className="text-neutral-500">
                                            Il bottone apparirá qua
                                        </h3>
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        <button
                                            onClick={() =>
                                                DownloadStore.addDownload(
                                                    Anime.nome,
                                                    Anime.episodio[specifico]
                                                        .numerino,
                                                    Anime.episodio[specifico]
                                                        .link
                                                )
                                            }
                                            className="w-36 rounded p-2 m-1 bg-cyan-700 hover:bg-cyan-600 hover:text-black active:bg-cyan-500 duration-200"
                                        >
                                            Epsiodio:{" "}
                                            {Anime.episodio[specifico].numerino}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )}
                </div>
                <div className="w-3/4 px-4">
                    <div className=" text-white">
                        <h2 className="font-semibold text-md text-center">
                            Descrizione
                        </h2>
                        <p className="text-justify">{Anime.descrizione}</p>
                    </div>
                    <div className="m-auto">
                        <h2 className="text-3xl text-white pb-3">
                            Download Episodi
                        </h2>
                        {Anime.episodio.length === 0 ? (
                            <div className="w-full text-center">
                                <h2 className="font-semibold text-white text-2xl">
                                    Episodi non disponibili!
                                    <br /> L'anime potrebbe essere già
                                    disponibile su VVVVID o qualche altro sito
                                    di streaming e non è disponibile per il
                                    download. Prova a cercarlo su Nyaa
                                </h2>
                            </div>
                        ) : (
                            Anime.episodio.map((episodio, index) => {
                                return (
                                    <button
                                        onClick={() =>
                                            DownloadStore.addDownload(
                                                Anime.nome,
                                                episodio.numerino,
                                                episodio.link
                                            )
                                        }
                                        key={index}
                                        className="w-36 rounded p-2 m-1 bg-cyan-700 hover:bg-cyan-600 hover:text-black active:bg-cyan-500 duration-200"
                                    >
                                        Epsiodio {episodio.numerino}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

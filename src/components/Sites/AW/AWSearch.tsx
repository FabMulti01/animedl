import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AW } from "../../../search/AW/AW";

import { loadAW } from "../../../search/AW/AWMethods";
import { getMAL } from "../../../stores/Settings";

export const AWSearch: React.FC = () => {
    const navigate = useNavigate();
    //Fix e il nome corretto senza "/"
    const { fix, nome } = useParams();
    const [loading, setLoading] = useState(true);
    const [AW, setAW] = useState<AW[]>([]);

    useEffect(() => {
        setLoading(true);
        const getAW = async () => {
            const anime = await loadAW(nome);
            if (loading) {
                setAW(anime);
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

    //Visualizzato durante il caricamento
    if (loading) {
        return (
            <div className="py-7 text-center w-full">
                <h2 className="text-3xl text-white pb-3">
                    Sto cercando {nome} su AnimeWorld
                </h2>
                <h3 className="text-2xl text-neutral-400">Attendi...</h3>
            </div>
        );
    }

    //Se il caricamento e terminato MA non sono stati trovati anime
    //Ritorno questo
    if (!loading && AW.length === 0) {
        return (
            <div className="py-7 text-center w-full">
                <h2 className="text-white font-semibold text-2xl">
                    Non ho trovato nulla per {nome} su AnimeWorld...
                </h2>
                <h3 className="text-2xl text-neutral-400">
                    Prova{" "}
                    {getMAL() ? (
                        <>
                            a <i>disattivare</i>
                        </>
                    ) : (
                        <>
                            ad <i>attivare</i>
                        </>
                    )}{" "}
                    la ricerca con MyAnimeList nelle impostazioni utente
                </h3>
            </div>
        );
    }

    return (
        <div className="py-2 text-center w-full h-auto">
            {AW.length > 1 ? (
                <h3 className="text-3xl text-white pb-3 font-semibold">
                    Trovati {AW.length} risultati per {nome} su AnimeWorld
                </h3>
            ) : (
                <h3 className="text-3xl text-white pb-3 font-semibold">
                    Trovato {AW.length} risultato per {nome} su AnimeWorld
                </h3>
            )}
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-4 row-auto">
                {AW.map((anime, i) => {
                    return (
                        <div
                            className="m-auto w-56 h-auto box-content text-center shadow-sm shadow-black"
                            key={i}
                        >
                            <button
                                onClick={() =>
                                    navigate("/AWInfo/" + fix, {
                                        state: anime,
                                    })
                                }
                                className="bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-500
                                            duration-200 rounded-md hover:text-black h-full w-full"
                            >
                                <img
                                    className="w-56 h-80 rounded-t-md"
                                    alt={anime.nome}
                                    src={anime.immagine}
                                ></img>

                                {anime.nome}
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="text-2xl text-center pt-2">
                <h2 className="text-white font-semibold text-2xl">
                    Non é quello che cercavi?
                </h2>
                <h3 className="text-2xl text-neutral-400">
                    Prova{" "}
                    {getMAL() ? (
                        <>
                            a <i>disattivare</i>
                        </>
                    ) : (
                        <>
                            ad <i>attivare</i>
                        </>
                    )}{" "}
                    la ricerca con MyAnimeList nelle impostazioni utente
                </h3>
            </div>
        </div>
    );
};

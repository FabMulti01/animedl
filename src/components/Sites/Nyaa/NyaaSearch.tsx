import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMagnet, FaInfoCircle } from "react-icons/fa";
import { Nyaa } from "../../../search/Nyaa/Nyaa";
import { loadNyaa } from "../../../search/Nyaa/NyaaMethods";

enum selettore {
    italiano = "Italiano",
    multilingua = "Multilingua",
    inglese = "Inglese",
}

export const NyaaSearch: React.FC = () => {
    const navigate = useNavigate();
    const { fix, nome } = useParams();
    const [loading, setLoading] = useState(true);
    const [Nyaa, setNyaa] = useState<Nyaa[]>([]);
    const [lingua, setLingua] = useState<selettore>(selettore.italiano);

    useEffect(() => {
        const getNyaa = async () => {
            setLoading(true);
            const anime = await loadNyaa(nome, lingua);
            if (loading) {
                setNyaa(anime);
                setLoading(false);
            } else {
                console.log("Caricamento delle informazioni annullato!");
            }
            return () => {
                setLoading(false);
            };
        };
        getNyaa();
    }, [lingua]);

    function handleSelector(lingua: selettore) {
        setLingua(lingua);
    }

    const Bottoni: React.FC = () => {
        return (
            <div className="pt-4">
                <h2 className="font-semibold text-white">
                    Passa ad un&apos;altra lingua
                </h2>
                <button
                    className="text-white w-52 p-2 m-1 rounded-xl bg-cyan-700 hover:bg-cyan-600 duration-200 hover:text-black"
                    disabled={lingua != selettore.italiano ? false : true}
                    onClick={() => handleSelector(selettore.italiano)}
                >
                    <h4>Italiano</h4>
                </button>
                <button
                    className="text-white w-52 p-2 m-1 rounded-xl bg-cyan-700 hover:bg-cyan-600 duration-200 hover:text-black"
                    disabled={lingua != selettore.multilingua ? false : true}
                    onClick={() => handleSelector(selettore.multilingua)}
                >
                    <h4>Multilingua</h4>
                </button>
                <button
                    className="text-white w-52 p-2 m-1 rounded-xl bg-cyan-700 hover:bg-cyan-600 duration-200 hover:text-black"
                    disabled={lingua != selettore.inglese ? false : true}
                    onClick={() => handleSelector(selettore.inglese)}
                >
                    <h4>Inglese</h4>
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="w-full text-center">
                <h2 className="text-3xl text-white pb-3">
                    Sto cercando <i>{nome}</i> su Nyaa
                </h2>
                <h3 className="text-2xl text-neutral-400">Attendi...</h3>
            </div>
        );
    }

    if (!loading && Nyaa === undefined) {
        return (
            <div className="w-full text-center">
                <h2 className="text-3xl text-white pb-3">
                    Non ho trovato nulla in {lingua} per {nome} su Nyaa
                </h2>
                <Bottoni />
            </div>
        );
    }

    return (
        <div className="m-auto text-center text-white">
            {Nyaa.length > 1 ? (
                <h2 className="text-3xl text-white pb-3 font-semibold">
                    Trovati {Nyaa.length} risultati in {lingua} per{" "}
                    <i>{nome}</i> su Nyaa
                </h2>
            ) : (
                <h2 className="text-3xl text-white pb-3 font-semibold">
                    Trovato {Nyaa.length} risultato in {lingua} per{" "}
                    <i>{nome}</i> su Nyaa
                </h2>
            )}
            <table className="m-auto w-4/5">
                <tbody className="text-center">
                    <tr>
                        <th>Nome</th>
                        <th>INFO</th>
                        <th>Seeds</th>
                        <th>Peso</th>
                        <th>Magnet</th>
                    </tr>
                    {Nyaa.map((Nyaa, index) => {
                        return (
                            <tr
                                key={index}
                                className="hover:bg-neutral-700 duration-200 rounded"
                            >
                                <td className="w-9/12">{Nyaa.nome}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate("/NyaaInfo/" + fix, {
                                                state: Nyaa,
                                            })
                                        }
                                        className="w-8 h-8 text-black text-center rounded bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 hover:text-white duration-200"
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </td>
                                <td>{Nyaa.seeds}</td>
                                <td>{Nyaa.peso}</td>
                                <td>
                                    <a href={Nyaa.magnet}>
                                        <button className="w-8 h-8 text-black text-center rounded bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 hover:text-white duration-200">
                                            <FaMagnet />
                                        </button>
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Bottoni />
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { FaMagnet } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Nyaa } from "../../../search/Nyaa/Nyaa";
import { infoNyaa } from "../../../search/Nyaa/NyaaMethods";

export const NyaaInfo: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [Nyaa, setNyaa] = useState<Nyaa>(useLocation().state as Nyaa);

    useEffect(() => {
        const getNyaa = async () => {
            setLoading(true);
            Nyaa.descrizione = await infoNyaa(Nyaa.link);
            if (loading) {
                setNyaa(Nyaa);
                setLoading(false);
            } else {
                console.log("Caricamento delle informazioni annullato!");
            }
            return () => {
                setLoading(false);
            };
        };
        getNyaa();
    }, []);

    if (loading) {
        return (
            <div className="py-7 w-full text-center">
                <h2 className="text-3xl text-white pb-3">
                    Sto caricando informazioni per <i>{Nyaa.nome}</i> su Nyaa
                </h2>
                <h3 className="text-2xl text-neutral-400">Attendi...</h3>
            </div>
        );
    }

    return (
        <div className="py-2 text-center text-white">
            <h2 className="text-3xl text-white pb-3 font-semibold">
                Informazioni aggiuntive per <i>{Nyaa.nome}</i> su Nyaa
            </h2>
            <table className="w-4/5">
                <tbody className="text-center w-full">
                    <tr>
                        <th>Nome</th>
                        <th>Seeds</th>
                        <th>Peso</th>
                        <th>Magnet</th>
                    </tr>
                    <tr>
                        <td className="w-9/12">{Nyaa.nome}</td>
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
                </tbody>
            </table>
            <div className="pt-4 w-4/5 m-auto">
                <div className="text-center font-semibold text-xl">
                    <h2>Descrizione della pagina di Nyaa</h2>
                    <h3 className="text-red-600">I link sono bloccati!</h3>
                </div>
                <div
                    className="infoNyaa text-center pt-4"
                    dangerouslySetInnerHTML={{ __html: Nyaa.descrizione }}
                ></div>
            </div>
        </div>
    );
};

import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Cerca: React.FC = () => {
    const navigate = useNavigate();
    const [nulla, setNulla] = useState(false);
    const [nome, setNome] = useState("");
    //True = AW, False = Nyaa
    const [site, setSite] = useState(true);

    function siteHandler() {
        //Sostituisce gli "/" con "%2F"
        //Controlla anche che il testo non sia solo spazi
        const nomefix = nome.replace("/", "%2F");
        //Controlla che non siano solo spazi
        if (nome.replace(/\s/g, "").length) {
            if (site) {
                setNulla(false);
                navigate("/AWSearch/" + nomefix, { state: nome });
            } else {
                navigate("/NyaaSearch/" + nomefix, { state: nome });
            }
        } else {
            setNulla(true);
        }
    }

    return (
        <div className="text-center w-full h-full">
            <div className="w-full text-white shadow-sm shadow-black">
                <button
                    onClick={() => setSite(true)}
                    className={classNames(
                        "w-1/2 h-12 duration-200 hover:bg-neutral-700 active:bg-neutral-500 bg-blend-lighten",
                        site ? "bg-neutral-700" : "bg-neutral-800"
                    )}
                >
                    AnimeWorld
                </button>
                <button
                    onClick={() => setSite(false)}
                    className={classNames(
                        "w-1/2 h-12 duration-200 hover:bg-neutral-700 active:bg-neutral-500 bg-blend-lighten",
                        !site ? "bg-neutral-700" : "bg-neutral-800"
                    )}
                >
                    Nyaa
                </button>
            </div>
            <h1 className="text-5xl font-semibold p-3 text-white">
                Cerca su {site ? "AnimeWorld" : "Nyaa"}
            </h1>
            <input
                className="text-black p-3 pl-6 w-96 rounded-l-lg mb-3 dark:border-0 border-2 border-black"
                type="text"
                placeholder="Cerca Anime"
                onChange={(e) => setNome(e.target.value)}
            ></input>
            <button
                onClick={siteHandler}
                title="Cerca l'anime su Nyaa"
                className="text-white w-52 p-3 rounded-r-lg bg-cyan-700 hover:bg-cyan-600 duration-200 hover:text-black"
            >
                Cerca...
            </button>
            {nulla ? (
                <div className="text-orange-200 font-medium">
                    <h3>Non stai cercando nulla!</h3>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

import React, { useState } from "react";
import { UnmountClosed } from "react-collapse";
import { FaMagnet, FaInfoCircle, FaArrowDown, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Nyaa } from "../../../search/Nyaa/Nyaa";

interface INyaaEntry {
    Nyaa: Nyaa;
    fix: string;
}

export const NyaaEntry: React.FC<INyaaEntry> = ({ Nyaa, fix }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <tr className="hover:bg-neutral-700 duration-200 rounded">
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
                <a title="Apri il magnet" href={Nyaa.magnet}>
                    <button className="w-8 h-8 text-black text-center rounded bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 hover:text-white duration-200">
                        <FaMagnet />
                    </button>
                </a>
                <button
                    className="w-8 h-8 text-black text-center rounded bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 hover:text-white duration-200"
                    title="Copia il magnet"
                    onClick={() => navigator.clipboard.writeText(Nyaa.magnet)}
                >
                    <FaCopy />
                </button>
            </td>
        </tr>
    );
};

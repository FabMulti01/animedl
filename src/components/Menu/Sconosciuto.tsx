import React from "react";
import { useLocation } from "react-router-dom";

export const Sconosciuto: React.FC = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <div className="w-full text-center">
            <h1 className="text-white text-4xl">Non dovresti essere qui...</h1>
            <h3 className="text-neutral-400 text-3xl">
                Torna indietro e riprova!
            </h3>
            <h3 className="text-neutral-600 text-lg">{location.pathname}</h3>
        </div>
    );
};

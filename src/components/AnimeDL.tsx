import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Mostrati sempre
import { Titlebar } from "./Menu/Titlebar";
import { Sidenav } from "./Menu/Sidenav";

//Pagina renderizzata all'avvio
import { Cerca } from "./Menu/Cerca";
import { Sconosciuto } from "./Menu/Sconosciuto";

//Siti dove cercare
import { AWSearch } from "./Sites/AW/AWSearch";
import { AWInfo } from "./Sites/AW/AWInfo";
import { NyaaSearch } from "./Sites/Nyaa/NyaaSearch";
import { NyaaInfo } from "./Sites/Nyaa/NyaaInfo";

export const AnimeDL: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col text-center w-full h-full overflow-hidden">
                <Titlebar />
                <div className="flex w-full flex-row altezza">
                    <Sidenav />
                    <div className="w-auto overflow-auto larghezza">
                        <Routes>
                            <Route path="/" element={<Cerca />} />
                            <Route
                                path="AWSearch/:nome"
                                element={<AWSearch />}
                            />
                            <Route path="AWInfo/:nome" element={<AWInfo />} />
                            <Route
                                path="NyaaSearch/:nome"
                                element={<NyaaSearch />}
                            />
                            <Route
                                path="NyaaInfo/:nome"
                                element={<NyaaInfo />}
                            />
                            <Route path="*" element={<Sconosciuto />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

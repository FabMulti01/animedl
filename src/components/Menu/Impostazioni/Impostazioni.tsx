import React, { useState } from "react";
import { Cartella } from "./Cartella";
import { FastExit } from "./FastExit";
import { Aggiorna } from "./Aggiorna";
import { ResetSettings } from "./ResetSettings";
import { Segnala } from "./Segnala";
import { getDownloadDir, getFastExit } from "@/types/UserSettings";
import { Title, Table } from "@mantine/core";

export const Settings: React.FC = () => {
    const [Directory, setDirectory] = useState(getDownloadDir());
    const [Fast, setFast] = useState(getFastExit());

    return (
        <>
            <Title align="center">Impostazioni</Title>

            <Table captionSide="bottom">
                <thead>
                    <tr>
                        <th style={{ width: "80%" }}></th>
                        <th style={{ width: "20%" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Cartella download */}
                    <Cartella
                        setDirectory={setDirectory}
                        Directory={Directory}
                    />
                    {/* Uscita rapida */}
                    <FastExit setFast={setFast} Fast={Fast} />
                    {/* Aggiorna */}
                    <Aggiorna />
                    {/* Resetta impostazioni */}
                    <ResetSettings
                        setDirectory={setDirectory}
                        setFast={setFast}
                    />
                    {/* Feedback */}
                    <Segnala />
                </tbody>
                <caption>
                    Le impostazioni utente vengono salvate automaticamente
                </caption>
            </Table>
        </>
    );
};

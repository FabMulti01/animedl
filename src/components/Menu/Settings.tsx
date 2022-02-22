import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { VscCheck, VscClose, VscRefresh, VscTools } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import User, {
    saveSettings,
    getDIR,
    getMAL,
    getNotification,
} from "../../stores/Settings";
import { DownloadStore } from "../../stores/Download";

export const Settings: React.FC = () => {
    const [MAL, setMAL] = useState(getMAL());
    const [DIR, setDIR] = useState(getDIR());
    const [notification, setNotification] = useState(getNotification());

    const navigate = useNavigate();

    const user = new User(MAL, DIR, notification);
    //Ogni volta che l'utente cambia le impostazioni, le salvo subito nel file
    useEffect(() => {
        saveSettings(user);
    }, [MAL, DIR, notification]);

    async function dirHandler() {
        const dir: string = await ipcRenderer.invoke("directory");
        if (dir != undefined) {
            setDIR(dir);
        }
    }

    return (
        <div className="pb-9 no-drag w-full h-full bg-cyan-900">
            <h1 className="font-bold text-2xl text-center">Impostazioni</h1>
            <div className="text-justify px-9">
                <h2 className="font-semibold text-xl pt-2">
                    Seleziona cartella di Download
                </h2>
                <input
                    type="text"
                    readOnly
                    onDoubleClick={dirHandler}
                    value={DIR}
                    title={DIR}
                    className="text-black w-4/6 p-2 rounded-l-2xl"
                ></input>
                <button
                    onClick={dirHandler}
                    className="w-2/6 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 rounded-r-2xl p-2"
                >
                    Sfoglia...
                </button>
                <h4 className="text-neutral-400 text-center">
                    Nella cartella selezionata verranno create anche le cartelle
                    dei vari anime scaricati
                </h4>
                <h2 className="font-semibold text-xl pt-2">
                    Abilita ricerca con MyAnimeList
                </h2>
                <div className="flex">
                    <button
                        onClick={() => setMAL(!MAL)}
                        title={notification ? "Abilitato" : "Disabilitato"}
                        className="flex bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 rounded-md p-2 w-auto"
                    >
                        {MAL ? <VscCheck /> : <VscClose />}
                    </button>
                    <h2 className="font-semibold text-center">
                        {MAL ? " Attivata" : " Disabilitata"}
                    </h2>
                </div>
                <h4 className="text-neutral-400 text-center">
                    La ricerca con MyAnimeList aiuta a cercare gli anime se non
                    si ricorda il nome esatto. Non sempre il risultato é quello
                    giusto
                </h4>
                <h2 className="font-semibold text-xl pt-2">
                    Abilita le notifiche Desktop
                </h2>
                <div className="flex">
                    <button
                        onClick={() => setNotification(!notification)}
                        title={notification ? "Abilitato" : "Disabilitato"}
                        className="flex bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 rounded-md p-2 w-auto"
                    >
                        {notification ? <VscCheck /> : <VscClose />}
                    </button>
                    <h2 className="font-semibold text-center">
                        {notification ? " Attivate" : " Disabilitate"}
                    </h2>
                </div>
                <h4 className="text-neutral-400 text-center">
                    Viene mostrata una notifica sul Desktop ogni qualvolta viene
                    iniziato / finito il download di un episodio e cliccandoci,
                    apre la cartella dove é salvato
                </h4>
                <div className="w-full">
                    <h2 className="font-semibold text-xl pt-2">
                        Ricarica l'app
                    </h2>
                    <button
                        title="Ricarica l'applicazione"
                        onClick={() => {
                            if (
                                !DownloadStore.download.some((download) =>
                                    download.episodio.some(
                                        (episodio) => episodio.finito === false
                                    )
                                )
                            ) {
                                navigate(0);
                            } else {
                                alert(
                                    "Arrestare i download avviati prima di ricaricare!"
                                );
                            }
                        }}
                        className="flex bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-400 rounded-md p-2 w-auto"
                    >
                        <VscRefresh />
                    </button>
                </div>
                <h4 className="text-neutral-400 text-center">
                    In caso vengano riportati molti errori nella console, oppure
                    l'app non si comporta come dovrebbe, ricaricarla potrebbe
                    risolvere il problema
                </h4>
            </div>
        </div>
    );
};

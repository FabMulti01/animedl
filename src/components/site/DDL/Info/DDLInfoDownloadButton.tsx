import type { DDLEpisodio } from "@interfaces/IDDL";
import { Button } from "@mantine/core";
import DownloadStore from "@stores/DownloadStore";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { DDLInfoContext } from "./DDLInfo";

const DDLInfoDownloadButton = observer(
    ({ episodio, titolo }: { episodio: DDLEpisodio; titolo: string }) => {
        const { sito, url } = useContext(DDLInfoContext);
        return (
            <Button
                w={156}
                disabled={DownloadStore.has(titolo, episodio.numero)}
                onClick={() => DownloadStore.add(sito, titolo, episodio, url)}
                title={
                    DownloadStore.has(titolo, episodio.numero)
                        ? "L'episodio é già nella lista dei download"
                        : "Scarica l'episodio " + episodio.numero
                }
            >
                Episodio: {episodio.numero}
            </Button>
        );
    }
);

export default DDLInfoDownloadButton;

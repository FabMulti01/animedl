import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { DH_STATES } from "node-downloader-helper";
import DownloadStore from "@stores/DownloadStore";
import ModalBody from "@components/utils/ModalBody";

/**
 * Stoppa tutti gli episodi, prima di chiudere l'app
 */
export default function exitCheck() {
    let nonTerminati = false;
    DownloadStore.anime.forEach((value) => {
        value.lista.forEach((value) => {
            if (
                value.Download.stato == DH_STATES.DOWNLOADING ||
                value.Download.stato == DH_STATES.PAUSED
            ) {
                nonTerminati = true;
            }
        });
    });
    if (nonTerminati) {
        modals.openConfirmModal({
            title: "Attenzione!",
            labels: { confirm: "Conferma", cancel: "Annulla" },
            centered: true,
            children: (
                <ModalBody
                    messaggio={
                        <Text>
                            Hai ancora download in corso! Vuoi chiudere comunque
                            l'app?
                        </Text>
                    }
                />
            ),
            onConfirm: () => {
                DownloadStore.anime.forEach((anime) => {
                    anime.lista.forEach((episodio) => {
                        episodio.Download.stream.stop();
                    });
                });
                window.controls.close();
            },
        });
    } else {
        window.controls.close();
    }
}

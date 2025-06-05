import ModalBody from "@components/utils/ModalBody";
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import DownloadStore from "@stores/DownloadStore";
import { DH_STATES } from "node-downloader-helper";

const DownloadInfoControlButtons = ({ titolo }: { titolo: string }) => {
    return (
        <Button.Group>
            <Button
                onClick={() => {
                    DownloadStore.anime
                        .get(titolo)
                        .lista.forEach((episodio) => {
                            episodio.Download.stream.pause();
                        });
                }}
            >
                Pausa tutto
            </Button>
            <Button
                onClick={() => {
                    DownloadStore.anime
                        .get(titolo)
                        .lista.forEach((episodio) => {
                            if (
                                episodio.Download.stato != DH_STATES.FINISHED &&
                                episodio.Download.stato != DH_STATES.STOPPED
                            )
                                episodio.Download.stream.resume();
                        });
                }}
            >
                Riprendi tutto
            </Button>
            <Button
                onClick={() => {
                    modals.openConfirmModal({
                        title: "Attenzione!",
                        centered: true,
                        labels: { confirm: "Continua", cancel: "Annulla" },
                        children: (
                            <ModalBody
                                messaggio={
                                    <Text>
                                        Sei sicuro di voler stoppare tutti i
                                        download in corso?
                                    </Text>
                                }
                            />
                        ),
                        onConfirm: () =>
                            DownloadStore.anime
                                .get(titolo)
                                .lista.forEach((episodio) => {
                                    episodio.Download.stream.stop();
                                }),
                    });
                }}
            >
                Stoppa tutto
            </Button>
        </Button.Group>
    );
};

export default DownloadInfoControlButtons;

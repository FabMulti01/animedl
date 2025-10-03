import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { Button, Text, Code } from "@mantine/core";
import UpdateModalBody from "./UpdateModalBody";
import exitCheck from "@functions/exitCheck";
import ModalBody from "@components/utils/ModalBody";

export default class Update {
    static check(show: boolean = true) {
        if (show) {
            notifications.show({
                id: "update",
                title: "Aggiornamento",
                message:
                    "Sto verificando se ci sono aggiornamenti disponibili...",
                loading: true,
                withBorder: true,
                autoClose: false,
            });
        }
        window.app.update
            .check()
            .then((info) => {
                if (info.isUpdateAvailable) {
                    notifications.clean();
                    modals.openConfirmModal({
                        title: "Aggiornamento disponibile!",
                        centered: true,
                        children: (
                            <ModalBody
                                messaggio={
                                    <>
                                        <Text>
                                            Nuova versione:{" "}
                                            {info.updateInfo.version}
                                        </Text>
                                        <Code
                                            dangerouslySetInnerHTML={{
                                                __html: info.updateInfo
                                                    .releaseNotes,
                                            }}
                                        />
                                    </>
                                }
                            />
                        ),
                        labels: { confirm: "Aggiorna", cancel: "Annulla" },
                        onConfirm: () => {
                            //Rimetto a true in caso si verificano errori
                            show = true;
                            Update.start();
                        },
                    });
                } else {
                    if (show) {
                        notifications.update({
                            id: "update",
                            message: "Nessun aggiornamento disponibile",
                            loading: false,
                            autoClose: 4000,
                        });
                    }
                }
            })
            .catch((e: string) => {
                if (show) {
                    Update.error(e);
                }
            });
    }

    private static start() {
        window.app.update.start();
        modals.open({
            title: "Download dell'aggiornamento in corso...",
            centered: true,
            closeOnEscape: false,
            closeOnClickOutside: false,
            withCloseButton: false,
            children: <UpdateModalBody />,
        });
    }

    static install() {
        modals.open({
            title: "Aggiornamento scaricato!",
            centered: true,
            closeOnEscape: false,
            closeOnClickOutside: false,
            withCloseButton: false,
            children: (
                <ModalBody
                    messaggio={
                        <Button fullWidth onClick={exitCheck}>
                            Installa
                        </Button>
                    }
                />
            ),
        });
    }

    static error(error: string) {
        modals.closeAll();
        notifications.clean();
        notifications.show({
            title: "Aggiornamento",
            message:
                "Si é verificato un errore durante l'aggiornamento: " + error,
            color: "red",
            withBorder: true,
            autoClose: false,
        });
    }
}

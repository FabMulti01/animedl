import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { EventEmitter } from "node:events";
import { ModalBody } from "@/components/utils/ModalBody";

class AnimeDLImp extends EventEmitter {
    /**
     * Mostra un messaggio di notifica in basso a destra
     * @param title il titolo della notifica
     * @param messaggio il messaggio
     * @param autoClose il tempo nel quale la notifica si chiude automaticamente in ms
     */
    notifica(
        title: string,
        messaggio: string,
        autoClose = 10000,
        color: string = "cyan"
    ): void {
        notifications.show({
            title: title,
            message: messaggio,
            autoClose: autoClose,
            color: color,
        });
    }

    /**
     * Modal con messaggio piu bottone di conferma
     * @param titolo Il titolo del modal
     * @param messaggio Il corpo del modal
     * @param onConfirm la funzione da eseguire quando viene premuto il tasto conferma
     * @param confirm testo del bottone confirm opzionale
     * @param cancel testo del bottone cancel opzionale
     */
    conferma(
        titolo: string,
        messaggio: string,
        onConfirm: Function,
        confirm = "Conferma",
        cancel = "Annulla"
    ): void {
        modals.openConfirmModal({
            title: titolo,
            centered: true,
            children: ModalBody(messaggio),
            labels: { confirm: confirm, cancel: cancel },
            onConfirm: () => {
                onConfirm();
            },
        });
    }

    /**
     * Mostra un modal senza nessun bottone per info
     * @param titolo il titolo del modal
     * @param messaggio il corpo del modal
     */
    info(titolo: string, messaggio: string): void {
        modals.open({
            title: titolo,
            centered: true,
            children: messaggio,
        });
    }
}

/**
 * Classe per la gestione di notifiche e modal
 * accessibili in tutta l'applicazione
 */
export const AnimeDL = new AnimeDLImp();

//Evento custom per dire al componente quando inizia a scaricare l'episodio
import { notifications } from "@mantine/notifications";
import { EventEmitter } from "node:events";

class AnimeDLEventsImp extends EventEmitter {
    notifica(tipo: string, messaggio: string, autoClose = 10000): void {
        notifications.show({
            title: tipo,
            message: messaggio,
            autoClose: autoClose,
        });
    }
}

export const AnimeDLEvents = new AnimeDLEventsImp();

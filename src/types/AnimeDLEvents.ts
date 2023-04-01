//Evento custom per dire al componente quando inizia a scaricare l'episodio
import { notifications } from "@mantine/notifications";
import { EventEmitter } from "node:events";

class AnimeDLEventsImp extends EventEmitter {
    notifica(tipo: string, messaggio: string): void {
        notifications.show({
            title: tipo,
            message: messaggio,
            autoClose: 10000,
        });
    }
}

export const AnimeDLEvents = new AnimeDLEventsImp();

//Evento custom per dire al componente quando inizia a scaricare l'episodio
//import { EventEmitter } from "node:events";

// class AnimeDLEventsImp extends EventEmitter {
//     notifica(tipo: string, messaggio: string): void {
//         //this.emit("notifica", tipo, messaggio);
//     }
// }

class AnimeDLEventsImp {}

export const AnimeDLEvents = new AnimeDLEventsImp();

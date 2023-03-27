import AW from "./AnimeWorld";

/**
 * Carica le informazioni mancanti degli episodi in un nuovo oggetto
 * @param anime l'anime che si vuole caricare
 * @returns lo stesso anime ma con le informazioni mancanti
 */
export async function InfoAW(
    nome: string,
    link: string,
    immagine: string
): Promise<AW> {
    const appoggio: AW = new AW(nome, link, immagine);
    await appoggio.setSito();
    appoggio.setEpisodi();
    appoggio.setStato();
    appoggio.setDescrizione();
    appoggio.setDataUscita();
    return appoggio;
}
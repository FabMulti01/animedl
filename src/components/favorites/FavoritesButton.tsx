import { Button } from "@mantine/core";
import { Preferiti } from "@stores/Preferiti";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

type props = {
    titolo: string;
    sito: string;
    url: string;
    fullWidth?: boolean;
};

/**
 * Mostra un bottone con la quale si può inserire o rimuovere un anime dalla lista dei preferiti
 * @param props titolo, sito, url, fullwitdh
 * @returns
 */
const FavoritesButton = ({ props }: { props: props }) => {
    const { titolo, sito, url, fullWidth = false } = props;
    const [attivo, setAttivo] = useState(Preferiti.has(titolo));

    function handlePreferito() {
        if (attivo) {
            Preferiti.remove(titolo);
        } else {
            Preferiti.add(sito, titolo, url);
        }
        setAttivo(!attivo);
    }

    return (
        <Button
            fullWidth={fullWidth}
            onClick={handlePreferito}
            title={attivo ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
            {attivo ? <IconStarFilled /> : <IconStar />}
        </Button>
    );
};

export default FavoritesButton;

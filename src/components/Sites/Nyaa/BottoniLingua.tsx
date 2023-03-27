import React from "react";
import { selettore } from "@/types/sites/Nyaa/Nyaa";
import { Button, Title } from "@mantine/core";

interface props {
    setLingua(lingua: string);
    lingua: string;
}
export const BottoniLingua: React.FC<props> = ({ setLingua, lingua }) => {
    return (
        <>
            <Title align="center" order={3}>
                Passa ad un&apos;altra lingua
            </Title>
            <Button.Group>
                <Button
                    fullWidth
                    disabled={lingua != selettore.italiano ? false : true}
                    onClick={() => setLingua(selettore.italiano)}
                >
                    Italiano
                </Button>
                <Button
                    fullWidth
                    disabled={lingua != selettore.multilingua ? false : true}
                    onClick={() => setLingua(selettore.multilingua)}
                >
                    Multilingua
                </Button>
                <Button
                    fullWidth
                    disabled={lingua != selettore.inglese ? false : true}
                    onClick={() => setLingua(selettore.inglese)}
                >
                    Inglese
                </Button>
            </Button.Group>
        </>
    );
};

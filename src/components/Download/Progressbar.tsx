import { MantineColor, Progress } from "@mantine/core";
import React from "react";

type props = {
    /**
     * Il colore visualizzato
     */
    color?: MantineColor;
    /**
     * Se deve mostrare o meno l'animazione
     */
    animate?: boolean;
    /**
     * Quando si hovera mostra il testo
     */
    title?: string;
    /**
     * La dimensione
     */
    percentuale: string;
};

export const Progressbar: React.FC<props> = ({
    color = "cyan",
    animate = true,
    title = "",
    percentuale,
}) => {
    return (
        <Progress
            title={title}
            size={"xl"}
            value={Number.parseFloat(percentuale)}
            color={color}
            animate={animate}
        />
    );
};

import React from "react";
import { Text, Title, Button } from "@mantine/core";
import { setFastExit } from "@/types/UserSettings";
import classNames from "classnames";

type props = {
    setFast(Fast: boolean);
    Fast: boolean;
};

export const FastExit: React.FC<props> = ({ setFast, Fast }) => {
    return (
        <tr>
            <td>
                <Title order={3}>Uscita rapida</Title>
                <Text>
                    Se é disattivata, viene mostrato un pop up quando ci sono
                    episodi ancora in download per evitare di perderne il
                    progresso. Se viene attivata gli episodi ancora in download
                    verranno stoppati automaticamente, eliminando il file
                </Text>
            </td>
            <td>
                <Button
                    onClick={() => {
                        setFast(!Fast);
                        setFastExit(!Fast);
                    }}
                    color={classNames(Fast ? "green" : "red")}
                    fullWidth
                >
                    {Fast ? "Abilitata" : "Disabilitata"}
                </Button>
            </td>
        </tr>
    );
};

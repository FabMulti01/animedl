import React from "react";
import * as User from "@/types/UserSettings";
import { Button, Text, Title } from "@mantine/core";

type props = {
    setDirectory(Directory: string): void;
    setFast(FastExit: boolean): void;
};

export const ResetSettings: React.FC<props> = ({ setDirectory, setFast }) => {
    async function reset() {
        User.resetSettings();
        setDirectory(User.getDownloadDir());
        setFast(User.getFastExit());
    }

    return (
        <tr>
            <td>
                <Title order={3}>Resetta impostazioni</Title>
                <Text>
                    Se si clicca il bottone le impostazioni torneranno a quelle
                    base
                </Text>
            </td>
            <td>
                <Button
                    fullWidth
                    onClick={() => {
                        reset();
                    }}
                >
                    Resetta
                </Button>
            </td>
        </tr>
    );
};

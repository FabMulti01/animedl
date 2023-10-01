import { Card, Stack, Code, Text, Title } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";

export const Sconosciuto: React.FC = () => {
    const location = useLocation();
    return (
        <Stack h={"100%"} justify="center" align="center">
            <Card>
                <Title>Pagina non trovata!</Title>
                <Text>
                    Non ho idea di come tua sia riuscito ad arrivare qua
                </Text>
                <Text>Path della pagina:</Text>
                <Code block>{location.pathname}</Code>
            </Card>
        </Stack>
    );
};

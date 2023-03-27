import { Container, Text } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router-dom";

export const Sconosciuto: React.FC = () => {
    const location = useLocation();
    return (
        <Container>
            <Text>Non dovresti essere qui...</Text>
            <Text>Torna indietro e riprova!</Text>
            <Text>{location.pathname}</Text>
        </Container>
    );
};

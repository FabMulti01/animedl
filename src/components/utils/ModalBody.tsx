import React from "react";
import { Card, Text } from "@mantine/core";

/**
 * Appoggio per dare lo stile al testo del modal
 * @param messaggio il messaggio da visualizzare
 * @returns il componente completo di testo
 */
export function ModalBody(messaggio: string): React.ReactNode {
    return (
        <Card>
            <Text>{messaggio}</Text>
        </Card>
    );
}

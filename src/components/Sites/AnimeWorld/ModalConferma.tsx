import { Modal, Text, Button, Card, Space } from "@mantine/core";
import React from "react";

type props = {
    opened: boolean;
    close(): void;
    episodi: number;
    downloadHandler(): void;
};

export const ModalConferma: React.FC<props> = ({
    opened,
    close,
    episodi,
    downloadHandler,
}) => {
    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Attenzione!"
            centered
            size={"auto"}
        >
            <Card>
                <Text>
                    Stai provando a scaricare <b>{episodi}</b> episodi!
                </Text>
                <Text>
                    Continuando l'applicazione potrebbe diventare instabile.
                </Text>
                <Space h={20} />
                <Button.Group>
                    <Button onClick={close} variant="outline" fullWidth>
                        Annulla
                    </Button>
                    <Button
                        onClick={() => {
                            downloadHandler();
                            close();
                        }}
                        fullWidth
                    >
                        Continua
                    </Button>
                </Button.Group>
            </Card>
        </Modal>
    );
};

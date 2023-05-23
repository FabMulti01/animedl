import { constants } from "@/utils";
import { Modal, Text, Button, Card, Space } from "@mantine/core";
import { ipcRenderer } from "electron";
import React from "react";

type props = {
    opened: boolean;
    close(): void;
};

export const ModalConferma: React.FC<props> = ({ opened, close }) => {
    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Aggiorna!"
            centered
            size={"auto"}
        >
            <Card>
                <Text>É disponibile un aggiornamento dell'applicazione</Text>
                <Text>Vuoi aprire la pagina di GitHub?</Text>
                <Space h={20} />
                <Button.Group>
                    <Button onClick={close} variant="outline" fullWidth>
                        Annulla
                    </Button>
                    <Button
                        onClick={() => {
                            ipcRenderer.invoke(
                                "apriBrowser",
                                constants.Repository
                            );
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

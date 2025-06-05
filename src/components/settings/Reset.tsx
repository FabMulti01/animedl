import ModalBody from "@components/utils/ModalBody";
import {
    Table,
    Title,
    Text,
    Button,
    useMantineColorScheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Impostazioni } from "@stores/Impostazioni";
import { IconRestore } from "@tabler/icons-react";
import { useNavigate } from "react-router";

const Reset = () => {
    const navigate = useNavigate();
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    function handleReset() {
        modals.openConfirmModal({
            title: "Attenzione!",
            centered: true,
            labels: { confirm: "Conferma", cancel: "Annulla" },
            children: (
                <ModalBody
                    messaggio={
                        <Text>
                            Sei sicuro di voler continuare con il reset delle
                            impostazioni?
                        </Text>
                    }
                />
            ),
            onConfirm: () => {
                Impostazioni.reset();
                setColorScheme(Impostazioni.tema);
                navigate("/", { replace: true });
            },
        });
    }

    return (
        <Table.Tr>
            <Table.Td>
                <Title order={4}>Reset</Title>
                <Text>Resetta le impostazioni di default dell'app</Text>
            </Table.Td>
            <Table.Td>
                <Button onClick={handleReset} fullWidth>
                    <IconRestore />
                </Button>
            </Table.Td>
        </Table.Tr>
    );
};

export default Reset;

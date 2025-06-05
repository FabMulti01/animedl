import { useState } from "react";
import { Form, useSubmit } from "react-router";
import { Stack, Title, TextInput, Button, Group, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Sites from "@classes/site/Sites";
import { Impostazioni } from "@stores/Impostazioni";

const Home = () => {
    const submit = useSubmit();
    const [sito, setSito] = useState(Impostazioni.lastUsedSite);
    const [tipo, setTipo] = useState(Sites.getTipo(sito));
    const [errore, setErrore] = useState(false);
    const [titolo, setTitolo] = useState("");

    function handleSito(sito: string) {
        setSito(sito);
        setTipo(Sites.getTipo(sito));
        Impostazioni.lastUsedSite = sito;
    }

    function handleCerca(e) {
        if (titolo.trim() == "") {
            setErrore(true);
        } else {
            submit(e, {
                action: tipo + "/search/" + sito + "/" + titolo,
                viewTransition: true,
            });
        }
    }

    return (
        <Stack h="100%" align="center" justify="center">
            <Title fz={60}>AnimeDL</Title>
            <Form>
                <Group>
                    <TextInput
                        value={titolo}
                        onChange={(event) => {
                            setErrore(false);
                            setTitolo(event.currentTarget.value);
                        }}
                        placeholder="Cerca l'anime..."
                        error={errore}
                        onKeyDown={(e) =>
                            e.key == "Enter" ? handleCerca(e) : null
                        }
                    />
                    <Select
                        defaultValue={sito}
                        data={Sites.getNomi()}
                        allowDeselect={false}
                        onChange={(value) => handleSito(value)}
                    />
                    <Button
                        rightSection={<IconSearch />}
                        onClick={(e) => handleCerca(e)}
                    >
                        Cerca
                    </Button>
                </Group>
            </Form>
        </Stack>
    );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Group, Title, Stack, Select } from "@mantine/core";
import { VscSearch } from "react-icons/vsc";
import { Sites } from "@/types/sites/Sites";
import { getLastUsedSite, setLastUsedSite } from "@/types/UserSettings";

export const Cerca: React.FC = () => {
    const navigate = useNavigate();

    //Nome dell'anime da cercare
    const [nome, setNome] = useState<string>("");
    //Costante di appoggio in caso non viene cercato nulla
    const [niente, setNiente] = useState<boolean>(false);
    //La lista dei siti per la ricerca
    const [searchList, setSearchList] = useState<string[]>([""]);
    //Appoggio per il recupero del sito corretto
    const [site, setSite] = useState<string>("");

    useEffect(() => {
        //Imposto l'ultimo sito utilizzato nella ricerca
        setSite(getLastUsedSite());
        /**
         * Array di appoggio per le pagine di ricerca
         */
        let appoggio: string[] = [];
        Sites.map((sito) => {
            if (sito.path.includes("Search")) {
                appoggio.push(sito.nome);
            }
        });
        setSearchList(appoggio);
    }, []);

    function searchHandler() {
        //Controlla anche che il testo non sia solo spazi
        if (nome.trim().length == 0) {
            setNiente(true);
        } else {
            //Navigazione dinamica
            navigate(
                "/" +
                    Sites.find((value) => {
                        if (value.nome == site) {
                            return true;
                        }
                    }).altNome +
                    "Search/" +
                    nome.replaceAll("/", "%2F"),
                {
                    state: nome,
                }
            );
        }
    }

    /**
     * Imposta il sito sulla quale eseguire la ricerca e lo salva nelle impostazioni utente
     * @param site il sito da utilizzare, é l'ALT name dei siti
     */
    function siteHandler(site: string) {
        if (searchList.includes(site)) {
            setLastUsedSite(searchList.at(searchList.indexOf(site)));
            setSite(site);
        }
    }

    return (
        <Stack h={"100%"} justify="center" align="center">
            <Title fz={75}>AnimeDL</Title>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    searchHandler();
                }}
            >
                <Group spacing={"xs"}>
                    <TextInput
                        error={niente ? "Non stai cercando nulla!" : ""}
                        autoFocus
                        placeholder="Inserisci il nome dell'anime..."
                        onChange={(e) => {
                            setNome(e.target.value);
                            setNiente(false);
                        }}
                        w="350px"
                    />
                    <Select
                        value={site}
                        onChange={siteHandler}
                        data={searchList}
                        w="30%"
                    />
                    <Button type="submit" leftIcon={<VscSearch />}>
                        Cerca
                    </Button>
                </Group>
            </form>
        </Stack>
    );
};

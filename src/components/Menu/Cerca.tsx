import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimeSites } from "@/types/sites/SiteList";
import { getLastUsedSite, setLastUsedSite } from "@/types/UserSettings";
import { Button, TextInput, Group, Title, Stack, Select } from "@mantine/core";
import { VscSearch } from "react-icons/vsc";

export const Cerca: React.FC = () => {
    const navigate = useNavigate();

    //Nome dell'anime da cercare
    const [nome, setNome] = useState<string>("");
    //Appoggio in caso non viene cercato nulla
    const [niente, setNiente] = useState<boolean>(false);
    //La lista dei siti per la ricerca
    const [searchList, setSearchList] = useState<string[]>([""]);
    //Appoggio per il recupero del sito corretto
    const [site, setSite] = useState<string>("");

    useEffect(() => {
        setSite(getLastUsedSite());
        let appoggio: string[] = [];
        AnimeSites.map((sito) => {
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
                    AnimeSites.find((value) => {
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
                        error={niente ? "Non stai cercando nulla" : ""}
                        autoFocus
                        placeholder="Inserisci il nome dell'anime..."
                        onChange={(e) => {
                            setNome(e.target.value);
                            setNiente(false);
                        }}
                        w="300px"
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

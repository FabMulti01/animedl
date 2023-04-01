import { observer } from "mobx-react";
import React from "react";
import { VscChevronRight } from "react-icons/vsc";
import { EpisodioStore } from "@/stores/EpisodioStore";
import { useNavigate } from "react-router-dom";
import { Progress, Flex, Text, Button } from "@mantine/core";
import { BottoniAnime } from "./BottoniAnime";

type props = {
    anime: EpisodioStore;
    nome: string;
};

export const DownloadAnimeItem: React.FC<props> = observer((props) => {
    const navigate = useNavigate();
    const { anime } = props;
    const { nome } = props;

    return (
        <tr>
            <td>
                <Text title={nome} lineClamp={1}>
                    {nome}
                </Text>
            </td>
            <td>
                <Flex direction={"column"}>
                    <Progress
                        title={anime.inDownload.toString() + " in download"}
                        size={"xl"}
                        animate={anime.inDownload > 0 ? true : false}
                        value={Number.parseFloat(anime.percentualeMedia)}
                    />
                </Flex>
            </td>
            <td>
                <Button.Group>
                    <BottoniAnime anime={anime} />
                    <Button
                        title="Info Download"
                        onClick={() =>
                            navigate(
                                "/DownloadAnimeInfo/" +
                                    nome.replaceAll("/", "%2F")
                            )
                        }
                    >
                        <VscChevronRight />
                    </Button>
                </Button.Group>
            </td>
        </tr>
    );
});

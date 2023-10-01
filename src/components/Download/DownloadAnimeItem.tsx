import React from "react";
import { observer } from "mobx-react";
import { VscChevronRight } from "react-icons/vsc";
import { EpisodioStore } from "@/stores/EpisodioStore";
import { useNavigate } from "react-router-dom";
import { Progress, Flex, Text, Button } from "@mantine/core";
import { BottoniAnime } from "./BottoniDownload/BottoniAnime";
import { formatBytes } from "@/utils";

/**
 * Entry per l'anime nella lista download
 */
export const DownloadAnimeItem: React.FC<{
    Anime: EpisodioStore;
    nome: string;
}> = observer((props) => {
    const navigate = useNavigate();
    const { Anime, nome } = props;
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
                        title={Anime.inDownload.toString() + " in download"}
                        size={"xl"}
                        animate={Anime.inDownload > 0 ? true : false}
                        value={Number.parseFloat(Anime.percentualeMedia)}
                    />
                </Flex>
            </td>
            <td>
                <Text>{formatBytes(Anime.pesoTotale)}</Text>
            </td>
            <td>
                <Button.Group>
                    <BottoniAnime Anime={Anime} />
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

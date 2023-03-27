import { observer } from "mobx-react";
import React from "react";
import { VscChevronRight } from "react-icons/vsc";
import { EpisodioStore } from "@/stores/EpisodioStore";
import { Link } from "react-router-dom";
import { Progress, Flex, Text, Button } from "@mantine/core";

interface Props {
    anime: EpisodioStore;
    nome: string;
}

export const DownloadAnimeItem: React.FC<Props> = observer((props) => {
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
                        size={"xl"}
                        animate={anime.inDownload > 0 ? true : false}
                        value={Number.parseFloat(anime.percentualeMedia)}
                    />
                </Flex>
            </td>
            <td className="text-center">
                <Link
                    to={"/DownloadAnimeInfo/" + nome.replaceAll("/", "%2F")}
                    title="Info download"
                >
                    <Button>
                        <VscChevronRight />
                    </Button>
                </Link>
            </td>
        </tr>
    );
});

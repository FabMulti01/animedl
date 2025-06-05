import { Anchor, Badge, Table } from "@mantine/core";
import PreferitiButton from "./FavoritesButton.js";
import { useNavigate } from "react-router";
import Sites from "@classes/site/Sites.js";

const PreferitIPageEntry = ({ titolo, sito, url }) => {
    const navigate = useNavigate();
    return (
        <Table.Tr>
            <Table.Td>
                <Anchor
                    size="sm"
                    lineClamp={1}
                    onClick={() => {
                        navigate(
                            "/" +
                                Sites.getTipo(sito) +
                                "/info/" +
                                sito +
                                "/" +
                                encodeURIComponent(url)
                        );
                    }}
                >
                    {titolo.replaceAll(/[.\-\_]+/g, " ")}
                </Anchor>
            </Table.Td>
            <Table.Td>
                <Badge variant="outline" radius="md" size="lg" fullWidth>
                    {sito}
                </Badge>
            </Table.Td>
            <Table.Td>
                <PreferitiButton
                    props={{ sito: sito, titolo: titolo, url: url }}
                />
            </Table.Td>
        </Table.Tr>
    );
};

export default PreferitIPageEntry;

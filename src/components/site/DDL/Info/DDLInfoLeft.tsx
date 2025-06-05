import { Table, Image, Text } from "@mantine/core";
import { useContext } from "react";
import { DDLInfoContext } from "./DDLInfo";
import PreferitiButton from "@components/favorites/FavoritesButton";

const DDLInfoLeft = () => {
    const { sito, url, info } = useContext(DDLInfoContext);
    return (
        <Table.Td w={220} valign="top">
            <Image w="100%" src={info.locandina} />
            <PreferitiButton
                props={{
                    titolo: info.titolo,
                    sito: sito,
                    url: url,
                    fullWidth: true,
                }}
            />
            <Text>
                <b>Stato:</b> {info.stato}
            </Text>
            <Text>
                <b>Episodi:</b> {info.numeroEpisodi}
            </Text>
            <Text>
                <b>Data uscita:</b> {info.dataUscita}
            </Text>
            <Text>
                <b>Data fine:</b> {info.dataFine}
            </Text>
        </Table.Td>
    );
};

export default DDLInfoLeft;

import { Table, Title, Text } from "@mantine/core";
import { useContext } from "react";
import { DDLInfoContext } from "./DDLInfo";
import DDLInfoDownload from "./DDLInfoDownload";

const DDLInfoRight = () => {
    const { info } = useContext(DDLInfoContext);
    return (
        <Table.Td w={"auto"} valign="top">
            <Title fz={"h3"}>Descrizione</Title>
            <Text>{info.descrizione}</Text>
            <DDLInfoDownload />
        </Table.Td>
    );
};

export default DDLInfoRight;

import { createContext } from "react";
import { useLoaderData } from "react-router";
import { Table } from "@mantine/core";
import type DDL from "@interfaces/IDDL";
import SiteTitle from "@components/site/utils/SiteTitle";
import DDLInfoLeft from "./DDLInfoLeft";
import DDLInfoRight from "./DDLInfoRigh";

export const DDLInfoContext = createContext<{
    sito: string;
    url: string;
    info: DDL;
}>(null);

const DDLInfo = () => {
    const { sito, url, info } = useLoaderData() as {
        sito: string;
        url: string;
        info: DDL;
    };
    return (
        <>
            <SiteTitle titolo={info.titolo} sito={info.sito} />
            <Table>
                <Table.Tbody>
                    <Table.Tr>
                        <DDLInfoContext
                            value={{ sito: sito, url: url, info: info }}
                        >
                            <DDLInfoLeft />
                            <DDLInfoRight />
                        </DDLInfoContext>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </>
    );
};

export default DDLInfo;

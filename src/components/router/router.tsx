import { createHashRouter, Outlet } from "react-router";
import App from "src/App";
import Home from "@components/home/Home";
import Settings from "@components/settings/Settings";
import Favorites from "@components/favorites/Favorites";
import DDLSearch from "@components/site/DDL/Search/DDLSearch";
import DDLInfo from "@components/site/DDL/Info/DDLInfo";
import DownloadList from "@components/download/List/DownloadList";
import DownloadInfo from "@components/download/Info/DownloadInfo";
import TorrentSearch from "@components/site/Torrent/Search/TorrentSearch";
import TorrentInfo from "@components/site/Torrent/Info/TorrentInfo";
import DDLClass from "@classes/site/DDL/DDLClass";
import Sconosciuto from "@components/utils/Sconosciuto";
import SiteError from "@components/site/utils/SiteError";
import TorrentClass from "@classes/site/Torrent/TorrentClass";

const router = createHashRouter([
    {
        path: "/",
        id: "App",
        Component: App,
        children: [
            {
                index: true,
                id: "Home",
                Component: Home,
            },
            {
                path: "Settings",
                id: "Settings",
                Component: Settings,
            },
            {
                path: "Preferiti",
                id: "Preferiti",
                Component: Favorites,
            },
            {
                path: "Download",
                id: "Download",
                Component: Outlet,
                children: [
                    {
                        index: true,
                        Component: DownloadList,
                    },
                    {
                        path: ":sito/:titolo",
                        Component: DownloadInfo,
                    },
                ],
            },
            {
                path: "DDL",
                id: "DDL",
                Component: Outlet,
                errorElement: <SiteError />,
                children: [
                    {
                        path: "search/:sito/:titolo",
                        loader: async ({ params }) => {
                            return {
                                sito: params.sito,
                                titolo: params.titolo,
                                lista: await DDLClass.getList(
                                    params.sito,
                                    params.titolo
                                ),
                            };
                        },
                        Component: DDLSearch,
                    },
                    {
                        path: "info/:sito/:url",
                        loader: async ({ params }) => {
                            return {
                                sito: params.sito,
                                url: params.url,
                                info: await DDLClass.getInfo(
                                    params.sito,
                                    params.url
                                ),
                            };
                        },
                        Component: DDLInfo,
                    },
                ],
            },
            {
                path: "Torrent",
                id: "Torrent",
                Component: Outlet,
                errorElement: <SiteError />,
                children: [
                    {
                        path: "search/:sito/:titolo",
                        loader: async ({ params, request }) => {
                            return {
                                sito: params.sito,
                                titolo: params.titolo,
                                torrent: await TorrentClass.getList(
                                    params.sito,
                                    params.titolo,
                                    new URL(request.url).searchParams.get(
                                        "ordine"
                                    ),
                                    new URL(request.url).searchParams.get(
                                        "lingua"
                                    ),
                                    new URL(request.url).searchParams.get(
                                        "pagina"
                                    )
                                ),
                            };
                        },
                        Component: TorrentSearch,
                    },
                    {
                        path: "info/:sito/:url",
                        loader: async ({ params }) => {
                            return {
                                sito: params.sito,
                                url: params.url,
                                info: await TorrentClass.getInfo(
                                    params.sito,
                                    params.url
                                ),
                            };
                        },
                        Component: TorrentInfo,
                    },
                ],
            },
            {
                path: "*",
                id: "Sconosciuto",
                Component: Sconosciuto,
            },
        ],
    },
]);

export default router;

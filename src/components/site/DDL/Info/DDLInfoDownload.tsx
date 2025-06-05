import { useContext, useEffect, useState } from "react";
import { DDLInfoContext } from "./DDLInfo";
import type { DDLEpisodio } from "@interfaces/IDDL";
import Caricamento from "@components/utils/Caricamento";
import { Group, Space, Title } from "@mantine/core";
import DDLInfoDownloadButton from "./DDLInfoDownloadButton";
import DDLInfoDownloadOther from "./DDLInfoDownloadOther";

const DDLInfoDownload = () => {
    const { info } = useContext(DDLInfoContext);
    const [episodi, setEpisodi] = useState<DDLEpisodio[]>(null);
    const [scelta, setScelta] = useState<number>(0);
    useEffect(() => {
        info.getEpisodeList().then((episodi) => {
            setEpisodi(episodi);
        });
    }, []);
    if (episodi == null) {
        return <Caricamento testo="Caricamento degli episodi in corso..." />;
    } else {
        return (
            <>
                <Title fz={"h3"}>Download</Title>
                <DDLInfoDownloadOther
                    scelta={scelta}
                    setScelta={setScelta}
                    episodi={episodi}
                />
                <Space h={16} />
                <Group>
                    {scelta == 0
                        ? episodi.map((episodio) => {
                              return (
                                  <DDLInfoDownloadButton
                                      key={episodio.numero}
                                      episodio={episodio}
                                      titolo={info.titolo}
                                  />
                              );
                          })
                        : episodi.map((episodio) => {
                              if (episodio.numero.includes(scelta.toString())) {
                                  return (
                                      <DDLInfoDownloadButton
                                          key={episodio.numero}
                                          episodio={episodio}
                                          titolo={info.titolo}
                                      />
                                  );
                              }
                          })}
                </Group>
            </>
        );
    }
};

export default DDLInfoDownload;

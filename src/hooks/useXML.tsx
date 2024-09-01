import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { socketClient } from "@/lib/utils";

const useXML = () => {
  const [xml, setXml] = useLocalStorage<string>("xml", "");

  useEffect(() => {
    socketClient.on("xml", (data) => {
      setXml(data);
    });

    return () => {
      socketClient.off("xml");
    };
  }, [setXml]);

  return xml;
};

export default useXML;

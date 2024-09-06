import { useEffect, useState } from "react";
import { socketClient } from "@/lib/utils";

const useXML = () => {
  const [xml, setXml] = useState<string>("");

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

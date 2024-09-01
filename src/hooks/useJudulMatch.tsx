import { useEffect, useState } from "react";
import useXML from "./useXML";
import { useSocketStatus } from "./useSocketStatus";
import { socketClient } from "@/lib/utils";

export const useJudulMatch = () => {
  const [judulMatch, setJudulMatch] = useState<string | null>(null);
  const xml = useXML();
  const socketStatus = useSocketStatus();

  const sendChangeJudulMatch = (e) => {
    e.preventDefault();

    if (!socketStatus) {
      return;
    }

    socketClient.emit("command", {
      Function: "SetText",
      Input: "draft1.gtzip",
      Value: judulMatch,
      SelectedName: "JUDUL MATCH.Text",
    });
  };

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    const judulMatch = xmlDoc.querySelector("text[name='JUDUL MATCH.Text']")?.textContent ?? "";
    setJudulMatch(judulMatch);

    return () => {};
  }, [xml]);

  return [judulMatch, setJudulMatch, sendChangeJudulMatch] as const;
};

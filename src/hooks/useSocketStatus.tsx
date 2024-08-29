import { socketClient } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSocketStatus = () => {
  const [status, setStatus] = useState<boolean>(socketClient.connected);

  useEffect(() => {
    socketClient.on("connect", () => {
      setStatus(socketClient.connected);
    });

    socketClient.on("disconnect", () => {
      setStatus(socketClient.connected);
    });

    return () => {
      socketClient.off("connect");
      socketClient.off("disconnect");
    };
  }, []);

  return status;
};

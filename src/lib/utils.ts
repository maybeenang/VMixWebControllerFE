import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { io } from "socket.io-client";
import GeneralTab from "@/components/tabs/GeneralTab";
import DraftTab from "@/components/tabs/DraftTab";
import { InGameTab } from "@/components/tabs/InGameTab";
import { XMLParser } from "fast-xml-parser";
import PengaturanTab from "@/components/tabs/PengaturanTab";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const socketClient = io("http://localhost:3000", {
  autoConnect: false,
});

export const xmlParser = new XMLParser();

export const tabs = [
  {
    value: "general",
    label: "General",
    content: GeneralTab,
  },
  {
    value: "draft",
    label: "Draft",
    content: DraftTab,
  },
  {
    value: "in-game",
    label: "In Game",
    content: InGameTab,
  },
  {
    value: "pengaturan",
    label: "Pengaturan",
    content: PengaturanTab,
  },
];

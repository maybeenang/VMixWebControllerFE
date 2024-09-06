import { sendVMixCommand } from "../utils";

const banVMixImageNames = [
  "Fill 1 Kiri.Fill.Bitmap",
  "Fill 2 Kiri.Fill.Bitmap",
  "Fill 3 Kiri.Fill.Bitmap",
  "Fill 4 Kiri1.Fill.Bitmap",
  "Fill 5 Kiri1.Fill.Bitmap",
  "Fill 5 Kanan1.Fill.Bitmap",
  "Fill 4 Kanan1.Fill.Bitmap",
  "Fill 3 Kanan.Fill.Bitmap",
  "Fill 2 kanan.Fill.Bitmap",
  "Fill 1 kanan.Fill.Bitmap",
];

const pickVMixImageNames = [
  "PLAYER 5 KANAN3.Source",
  "PLAYER 4 KANAN3.Source",
  "PLAYER 3 KANAN3.Source",
  "PLAYER 2 KANAN3.Source",
  "PLAYER 1 KANAN3.Source",
  "PLAYER 1 KIRI2.Source",
  "PLAYER 2 KIRI2.Source",
  "PLAYER 3 KIRI2.Source",
  "PLAYER 4 KIRI2.Source",
  "PLAYER 5 KIRI2.Source",
];

const banVMixImageInputs = ["DRAFT2.gtzip", "DRAFT3.gtzip"];

const pickVMixImageInput = "DRAFT4.gtzip";

const assetPath = {
  ban: import.meta.env.VITE_HERO_BAN_PATH,
  pick: import.meta.env.VITE_HERO_PICK_PATH,
};

export const senBanHeroCommand = (team: "blue" | "red", hero: string, index: number) => {
  const teamSide = team === "blue" ? "kiri" : "kanan";

  const filteredNames = banVMixImageNames.filter((name) =>
    name.toLowerCase().includes(teamSide.toLowerCase()),
  );

  const [, number] = filteredNames[index].split(" ");

  const input = parseInt(number) <= 3 ? banVMixImageInputs[0] : banVMixImageInputs[1];

  // filter hero name form ' char
  let heroName = hero.replace("'", "_");
  heroName = heroName.replace("-", " ");
  heroName = heroName.replace(".", "");

  sendVMixCommand([
    {
      Function: "SetImage",
      Input: input,
      Value: `${assetPath.ban}${heroName.toLocaleUpperCase()}.png`,
      SelectedName: filteredNames[index],
    },
  ]);
};

export const sendPickHeroCommand = (team: "blue" | "red", hero: string, index: number) => {
  const teamSide = team === "blue" ? "kiri" : "kanan";

  const filteredNames = pickVMixImageNames.filter((name) =>
    name.toLowerCase().includes(teamSide.toLowerCase()),
  );

  sendVMixCommand([
    {
      Function: "SetImage",
      Input: pickVMixImageInput,
      Value: `${assetPath.pick}${hero}.png`,
      SelectedName: filteredNames[index],
    },
  ]);
};

export const sendChangeJudulMatch = (judulMatch: string) => {
  sendVMixCommand({
    Function: "SetText",
    Input: import.meta.env.VITE_DRAFT1_GTZIP,
    Value: judulMatch,
    SelectedName: import.meta.env.VITE_JUDUL_MATCH_TEXT,
  });
};

const bluePlayersText = [
  "1STNICKKIRI.Text",
  "2NDNICKKIRI.Text",
  "3RDNICKKIRI.Text",
  "4THNICKKIRI.Text",
  "5THNICKKIRI.Text",
];

const redPlayersText = [
  "5THNICKKANAN.Text",
  "4THNICKKANAN.Text",
  "3RDNICKKANAN.Text",
  "2NDNICKKANAN.Text",
  "1STNICKKANAN.Text",
];

export const sendSyncCommandGeneral = (blueTeam, redTeam) => {
  sendVMixCommand([
    {
      Function: "SetText",
      Value: blueTeam?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: "NAMA TIM KIRI.Text",
    },
    {
      Function: "SetText",
      Value: redTeam?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: "NAMA TIM KANAN.Text",
    },
  ]);

  sendVMixCommand(
    bluePlayersText.map((text, index) => ({
      Function: "SetText",
      Value: blueTeam?.players[index]?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );

  sendVMixCommand(
    redPlayersText.map((text, index) => ({
      Function: "SetText",
      Value: redTeam?.players[index]?.name,
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );
};

export const sendSyncCommandDraft = (blueTeamPlayers, redTeamPlayers) => {
  sendVMixCommand(
    bluePlayersText.map((text, index) => ({
      Function: "SetText",
      Value: blueTeamPlayers[index],
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );

  sendVMixCommand(
    redPlayersText.map((text, index) => ({
      Function: "SetText",
      Value: redTeamPlayers[index],
      Input: import.meta.env.VITE_DRAFT1_GTZIP,
      SelectedName: text,
    })),
  );
};

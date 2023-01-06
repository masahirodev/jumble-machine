export type SidebarDataType = {
  title: string;
  icon: string;
  link: string;
};

export const sidebarData1 = [
  {
    title: "フォルダ設定",
    icon: "GrDomain",
    link: "/intricate/settingFolder",
  },
  {
    title: "メインパーツ設定",
    icon: "GrDomain",
    link: "/intricate/mainConfig",
  },
  {
    title: "オプションパーツ設定",
    icon: "GrDomain",
    link: "/intricate/optionConfig/Total",
  },
] as const;

export const sidebarData2 = [
  {
    title: "並び替え設定",
    icon: "GrDomain",
    link: "/intricate/sortConfig",
  },
  {
    title: "メタデータ設定",
    icon: "GrDomain",
    link: "/intricate/renameConfig",
  },
] as const;

export type IntricateLinks =
  | typeof sidebarData1[number]["link"]
  | typeof sidebarData2[number]["link"];

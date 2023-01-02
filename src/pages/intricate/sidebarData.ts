export type SidebarDataType = {
  title: string;
  icon: string;
  link: string;
};

export const sidebarData = [
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
    title: "並び替え設定",
    icon: "GrDomain",
    link: "/intricate/sortConfig",
  },
  {
    title: "オプションパーツ設定",
    icon: "GrDomain",
    link: "/intricate/optionConfigTotal",
  },
] as const;

export type IntricateLinks = typeof sidebarData[number]["link"];

import { sidebarData } from "./sidebarData";
import { useContext } from "react";
import { IntricateContext } from "./IntricateContext";
import { SidebarContents } from "./SidebarContents";

export const Sidebar = () => {
  const { intricateDatas } = useContext(IntricateContext);
  const mainPartsLists = intricateDatas
    .filter((value) => {
      return value.pairing === "main" || value.pairing === "bg";
    })
    .map((value) => {
      return value.folder;
    });
  const mainPartsDatas = mainPartsLists.map((value) => {
    return {
      title: value,
      icon: "VscSettingsGear",
      link: `/intricate/optionConfig/${value}`,
    };
  });

  return (
    <>
      {sidebarData.map((menu, index) => {
        return <SidebarContents menu={menu} key={index} />;
      })}
      {mainPartsDatas.map((menu, index) => {
        return <SidebarContents menu={menu} key={index} />;
      })}
    </>
  );
};

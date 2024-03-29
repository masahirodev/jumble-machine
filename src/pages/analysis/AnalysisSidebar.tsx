import { useContext } from "react";
import { AnalysisContext } from "./AnalysisContext";
import { GlobalSidebarContents } from "../../components/GlobalSidebarContents";

export const sidebarData = [
  {
    title: "フォルダ設定",
    icon: "GrDomain",
    link: "/analysis",
  },
];

export const AnalysisSidebar: React.FC = () => {
  const { exDatas } = useContext(AnalysisContext);
  const partsDatas = exDatas!!.map((value) => {
    return {
      title: value,
      icon: "VscSettingsGear",
      link: `/analysis/data/${value}`,
    };
  });

  return (
    <>
      {exDatas &&
        partsDatas.map((menu, index) => {
          return <GlobalSidebarContents menu={menu} key={index} />;
        })}
    </>
  );
};

import { GlobalSidebarContents } from "../../components/GlobalSidebarContents";

export const sidebarData = [
  {
    title: "ペア削除",
    icon: "GrDomain",
    link: "/delete",
  },
];

export const DeleteSidebar: React.FC = () => {
  return (
    <>
      {sidebarData.map((menu, index) => {
        return <GlobalSidebarContents menu={menu} key={index} />;
      })}
    </>
  );
};

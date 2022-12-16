import { SidebarData } from "./SidebarData";

export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((value, index) => {
          return (
            <li
              key="index"
              className="row"
              onClick={() => {
                window.location.pathname = value.link;
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

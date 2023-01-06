import { GrDomain } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";

export const GetSvg = ({ name }: { name: string }) => {
  switch (name) {
    case "GrDomain":
      return <GrDomain />;

    case "VscSettingsGear":
      return <VscSettingsGear />;
    default:
      return <></>;
  }
};

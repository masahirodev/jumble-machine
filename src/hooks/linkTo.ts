import { IntricateLinks } from "../utils/sidebarData";
import { InternalLinks } from "../utils/internalLinks";

//TODO pathの統一
export const linkTo = (internalLink: InternalLinks | IntricateLinks) => {
  window.location.href =
    internalLink.charAt(0) === "/" ? `#${internalLink}` : `#/${internalLink}`;
};

import { InternalLinks } from "../utils/internalLinks";

export const linkTo = (internalLink: InternalLinks) => {
  window.location.href = `#/${internalLink}`;
};

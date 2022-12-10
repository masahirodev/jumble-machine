const tableSubHeader: string[] = [
  "description",
  "background_color",
  "image",
  "animation_url",
  "external_url",
  "youtube_url",
];

export const tableHeader: string[] = [
  "id",
  "name",
  ...tableSubHeader,
  "imagePath",
];

export const changeTableHeader = (change: boolean): string[] => {
  if (change) {
    return ["name", "imagePath"];
  } else return tableHeader;
};

export const internalLinks = [
  "design",
  "intricate",
  "prep",
  "blueprint",
  "analysis",
  "delete",
  "convert",
  "export",
  "other",
  "test",
] as const;
export type InternalLinks = typeof internalLinks[number];

export const internalLinkContents: {
  [key in InternalLinks]: {
    title: string;
  };
} = {
  design: {
    title: "Design",
  },
  intricate: {
    title: "Intricate",
  },
  prep: {
    title: "Preparation",
  },
  blueprint: {
    title: "Blueprint",
  },
  convert: {
    title: "Convert",
  },
  analysis: {
    title: "Analysis",
  },
  delete: {
    title: "Delete",
  },
  export: {
    title: "Export",
  },
  other: {
    title: "Other",
  },
  test: {
    title: "Test",
  },
};

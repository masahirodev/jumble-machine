export const splitText = (text: string | undefined, splitText: string) => {
  if (text !== undefined) {
    return text.split(splitText).pop();
  }
};

//ファイルネームだけ抜き出し
export const getFileName = (path: string) => {
  return splitText(path, "//");
};

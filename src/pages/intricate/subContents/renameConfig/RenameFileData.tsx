import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { FileData } from "../../../../schema/intricate";
import { IntricateContext } from "../../IntricateContext";

type Props = {
  data: FileData;
  folder: string;
};

export const RenameFileData: React.FC<Props> = ({ data, folder }) => {
  const { intricateDatas, setIntricateDatas } = useContext(IntricateContext);

  const renameFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.rename = e.target.value;
    intricateDatas
      .filter((intricateData) => {
        return intricateData.folder === folder;
      })[0]
      ["fileDatas"].filter((fileData) => {
        return fileData.name === data.name;
      })[0].rename = e.target.value;
    setIntricateDatas(intricateDatas);
  };

  return (
    <>
      <Form.Control
        name={"rename"}
        onChange={renameFunc}
        defaultValue={
          data.rename === undefined
            ? data.name.split(".").slice(0, -1).join(".")
            : data.rename
        }
      />
    </>
  );
};

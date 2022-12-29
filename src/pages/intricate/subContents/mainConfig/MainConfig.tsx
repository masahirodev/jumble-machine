import { useContext } from "react";
import { IntricateContext } from "../../IntricateContext";
import { EditIntricateConfig } from "./EditIntricateConfig";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const MainConfig = () => {
  const { intricateDatas, saveData } = useContext(IntricateContext);
  const next = () => {
    saveData();
  };
  return (
    <Container className="p-3">
      {intricateDatas
        .filter((value) => {
          return value.pairing === "main" || value.pairing === "bg";
        })
        .map((value, index) => {
          return <EditIntricateConfig data={value} key={index} />;
        })}
      <Button onClick={next}>データを保存して次に進む</Button>
    </Container>
  );
};

import { useContext } from "react";
import Container from "react-bootstrap/Container";
import { Step } from "../../components/Step";
import { AddOptionForm } from "./AddOptionForm";
import { PrepContext } from "./PrepContext";

export const AddOption = () => {
  const { hasIntricateDatas } = useContext(PrepContext);
  return (
    <>
      {hasIntricateDatas && (
        <Container className="px-5">
          <Container>
            <Step
              title={"ジェネラティブを再度行って、データを追加する"}
              children={<AddOptionForm />}
              color={hasIntricateDatas ? "#0d6efd" : ""}
              size={"min"}
            />
          </Container>
        </Container>
      )}
    </>
  );
};

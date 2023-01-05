import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { intricateDescriptions } from "../../../text/intricateDescriptions";

export const IntricateDescription = () => {
  const Sentence = ({ texts }: { texts: string[] }) => {
    return (
      <>
        {texts.map((text, index) => {
          return (
            <span key={index}>
              {text}
              <br />
            </span>
          );
        })}
      </>
    );
  };

  return (
    <>
      {intricateDescriptions.map((content, index) => {
        return (
          <Container fluid className="py-3" key={index}>
            <Row>
              <Col>
                <p
                  style={{ fontWeight: "bold", fontSize: "1.5rem", margin: 0 }}
                >
                  {content.title}
                </p>
                <div style={{ paddingLeft: "1rem" }}>
                  {typeof content.text === "string" ? (
                    <>{content.text}</>
                  ) : (
                    <Sentence texts={content.text} />
                  )}
                </div>
                <Row style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>
                  <Col>
                    {content.description && (
                      <Sentence texts={content.description} />
                    )}
                  </Col>
                  {content.description2 && (
                    <Col>
                      <Sentence texts={content.description2} />
                    </Col>
                  )}
                </Row>
                {content.description3 && (
                  <Col style={{ paddingLeft: "1rem" }}>
                    <Sentence texts={content.description3} />
                  </Col>
                )}
              </Col>
            </Row>
          </Container>
        );
      })}
    </>
  );
};

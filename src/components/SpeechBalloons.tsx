import Faceicon from "../assets/faceicon.svg";

type Props = {
  comment: string | string[];
};

export const SpeechBalloons: React.FC<Props> = ({ comment }) => {
  return (
    <>
      <div style={{ padding: "1rem", width: "100%" }}>
        <div style={balloon}>
          <div style={faceicon}>
            <img src={Faceicon} alt="faceicon" style={faceiconImg}></img>
          </div>
          <div style={chatting}>
            <div style={says}>
              <span style={after}></span>
              {typeof comment === "string" ? (
                <p style={saysP}>{comment}</p>
              ) : (
                <p style={saysP}>
                  {comment[0]}
                  <br />
                  {comment[1]}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const balloon: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
};

const faceicon: React.CSSProperties = {
  float: "left",
  width: "80px",
};

const faceiconImg: React.CSSProperties = {
  width: "100%",
  height: "auto",
};

const chatting: React.CSSProperties = {
  width: "100%",
};

const says: React.CSSProperties = {
  display: "flex",
  position: "relative",
  width: "95%",
  margin: "0 0 0 30px",
  padding: "17px 13px",
  borderRadius: "12px",
  background: "#d7ebfe",
  minHeight: "82px",
  alignItems: "center",
};

const after: React.CSSProperties = {
  content: '""',
  display: "inline-block",
  position: "absolute",
  top: "30px",
  left: "-24px",
  border: "12px solid transparent",
  borderRight: "12px solid #d7ebfe",
};

const saysP: React.CSSProperties = {
  margin: 0,
  padding: 0,
};

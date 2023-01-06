//TODO テストページ
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const Test = () => {
  const [result, setResult] = useState<string>("");
  const word: string = "Hello";
  const button = async () => {
    const fetch: string = await window.fastApi.helloWorld(word);
    setResult(fetch);
  };
  const button2 = () => {};
  const button3 = () => {};

  //TODO 実はipc通信がpromiseになっていない。
  //    const fetch = await new Promise<ApiProps>((resolve) => {
  //      const data = window.storeApi.operateStore("has", {
  //        name: String(projectId),
  //        key: "blueprint",
  //      });
  //      console.log("2");
  //      resolve(data);
  //    });

  return (
    <>
      <Container className="px-5">
        <Container>
          <div>test</div>
          <Button onClick={button}>スタート</Button>
          <Button onClick={button2}>成功</Button>
          <Button onClick={button3}>失敗</Button>
          <div>{result}</div>
        </Container>
      </Container>
    </>
  );
};

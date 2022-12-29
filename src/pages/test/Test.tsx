//TODO テストページ
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

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
      <div>test</div>
      <Button onClick={button}>スタート</Button>
      <Button onClick={button2}>成功</Button>
      <Button onClick={button3}>失敗</Button>
      <Image
        src={
          "file:///" +
          "Users/eggdragon/Library/Application Support/jumble-machine/sample.png"
        }
      ></Image>
      <div>{result}</div>
    </>
  );
};

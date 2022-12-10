//TODO テストページ
import Button from "react-bootstrap/Button";

export const Test = () => {
  const button = async () => {};
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
      <div>test</div>
    </>
  );
};

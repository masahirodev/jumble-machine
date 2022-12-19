import { PageTemplate } from "./PageTemplate";
import { Test } from "./Test";

export const TestTop = () => {
  return (
    <>
      <PageTemplate
        button={<div>test</div>}
        contents={
          <>
            <Test />
          </>
        }
        comment="test"
      />
    </>
  );
};

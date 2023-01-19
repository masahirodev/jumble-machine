import { RouterConfig } from "./pages/RouterConfig";
import { LoginProvider } from "./pages/common/LoginContext";

export const App = () => {
  console.log("workflowtest");
  return (
    <LoginProvider>
      <RouterConfig />
    </LoginProvider>
  );
};

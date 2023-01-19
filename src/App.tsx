import { RouterConfig } from "./pages/RouterConfig";
import { LoginProvider } from "./pages/common/LoginContext";

export const App = () => {
  return (
    <LoginProvider>
      <RouterConfig />
    </LoginProvider>
  );
};

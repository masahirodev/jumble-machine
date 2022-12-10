import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { BlueprintProvider } from "./blueprint/BlueprintContext";
import { Layout } from "./Layout";
import { Blueprint } from "./blueprint/Blueprint";
import { Top } from "./top/Top";
import { DesignConfig } from "./design/DesignConfig";
import { DesignProvider } from "./design/DesignContext";
import { Preparation } from "./preparation/Preparation";
import { Export } from "./export/Export";
import { Test } from "./test/Test";
import {
  blueprintLoader,
  convertLoader,
  designLoader,
  exportLoader,
  importLoader,
  prepLoader,
  topLoader,
} from "../hooks/routerLoader";
import { PageTemplate } from "./test/PageTemplate";
import { Convert } from "./convert/Convert";
import { Other } from "./other/Other";

const ErrorBoundary: React.FC = () => {
  let error = useRouteError();
  console.error(error);
  return (
    <>
      <div>Error!</div>
    </>
  );
};

//TODO pageテンプレート化し、その後、childrenをmap化
export const RouterConfig: React.FC = () => {
  const routes = [
    {
      path: "/",
      element: (
        <>
          <Layout />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Top />,
          errorElement: <ErrorBoundary />,
          loader: async () => {
            return topLoader();
          },
        },
        {
          path: "/design",
          element: (
            <DesignProvider>
              <DesignConfig />
            </DesignProvider>
          ),
          loader: async () => {
            return designLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/prep",
          element: <Preparation />,
          loader: async () => {
            return prepLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/blueprint",
          element: (
            <BlueprintProvider>
              <Blueprint />
            </BlueprintProvider>
          ),
          loader: async () => {
            return blueprintLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/convert",
          element: <Convert />,
          loader: async () => {
            return convertLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/export",
          element: <Export />,
          loader: async () => {
            return exportLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/other",
          element: <Other />,
          loader: async () => {
            return importLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/test",
          element: (
            <PageTemplate
              button={<div>test</div>}
              contents={
                <>
                  <Test />
                </>
              }
            />
          ),
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ];

  const router = createHashRouter(routes, {
    basename: "/",
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

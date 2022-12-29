import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { BlueprintProvider } from "./blueprint/BlueprintContext";
import { Header } from "../components/Header";
import { Blueprint } from "./blueprint/Blueprint";
import { Top } from "./top/Top";
import { Preparation } from "./preparation/Preparation";
import { Export } from "./export/Export";
import { Test } from "./test/Test";
import {
  blueprintLoader,
  convertLoader,
  designLoader,
  exportLoader,
  importLoader,
  intricateLoader,
  prepLoader,
  topLoader,
} from "../hooks/routerLoader";
import { TestTop } from "./test/TestTop";
import { Convert } from "./convert/Convert";
import { Other } from "./other/Other";
import { Intricate } from "./intricate/Intricate";
import { SettingFolder } from "./intricate/subContents/folderConfig/SettingFolder";
import { IntricateProvider } from "./intricate/IntricateContext";
import { MainConfig } from "./intricate/subContents/mainConfig/MainConfig";
import { OptionConfig } from "./intricate/subContents/optionConfig/OptionConfig";
import Container from "react-bootstrap/esm/Container";
import { DesignTop } from "./design/DesignTop";
import { OptionConfigTotal } from "./intricate/subContents/optionConfig/OptionConfigTotal";
import { SortConfig } from "./intricate/subContents/sortConfig/SortConfig";

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
          <Container
            fluid
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100vh",
              margin: "0",
              padding: "0",
            }}
          >
            <Header />
            <Outlet />
          </Container>
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
          element: <DesignTop />,
          loader: async () => {
            return designLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/intricate",
          element: (
            <IntricateProvider>
              <Intricate />
            </IntricateProvider>
          ),
          children: [
            {
              path: "settingFolder",
              element: <SettingFolder />,
            },
            {
              path: "mainConfig",
              element: <MainConfig />,
            },
            {
              path: "optionConfig",
              element: <OptionConfigTotal />,
            },
            {
              path: "optionConfig/:mainPartsName",
              element: <OptionConfig />,
            },
            {
              path: "sortConfig",
              element: <SortConfig />,
            },
          ],
          loader: async () => {
            return intricateLoader();
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
          element: <TestTop />,
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

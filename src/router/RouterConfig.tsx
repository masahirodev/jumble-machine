import {
  createHashRouter,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Header } from "../components/Header";
import { Top } from "../pages/top/Top";
import {
  analysisLoader,
  blueprintLoader,
  convertLoader,
  deleteLoader,
  designLoader,
  exportLoader,
  exportXRPLLoader,
  importLoader,
  intricateLoader,
  prepLoader,
  topLoader,
} from "./routerLoader";
import { TestTop } from "../pages/test/TestTop";
import { IntricateTop } from "../pages/intricate/IntricateTop";
import { SettingFolder } from "../pages/intricate/subContents/folderConfig/SettingFolder";
import { MainConfig } from "../pages/intricate/subContents/mainConfig/MainConfig";
import { OptionConfig } from "../pages/intricate/subContents/optionConfig/OptionConfig";
import Container from "react-bootstrap/esm/Container";
import { DesignTop } from "../pages/design/DesignTop";
import { OptionConfigTotal } from "../pages/intricate/subContents/optionConfig/OptionConfigTotal";
import { SortConfig } from "../pages/intricate/subContents/sortConfig/SortConfig";
import { IntricateDescription } from "../pages/intricate/subContents/IntricateDescription";
import { RenameConfig } from "../pages/intricate/subContents/renameConfig/RenameConfig";
import { PreparationTop } from "../pages/preparation/PreparationTop";
import { BlueprintTop } from "../pages/blueprint/BlueprintTop";
import { ConvertTop } from "../pages/convert/ConvertTop";
import { ExportTop } from "../pages/export/ExportTop";
import { OtherTop } from "../pages/other/OtherTop";
import { DataConfig } from "../pages/intricate/subContents/dataConfig/DataConfig";
import { AnalysisTop } from "../pages/analysis/AnalysisTop";
import { PartsAnalysis } from "../pages/analysis/PartsAnalysis";
import { DeleteTop } from "../pages/delete/DeleteTop";
import { DeletePairDatas } from "../pages/delete/DeletePairDatas";
import { ExportXRPTop } from "../pages/xrpl/ExportXRPLTop";

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
          element: <IntricateTop />,
          children: [
            {
              index: true,
              element: <IntricateDescription />,
            },
            {
              path: "settingFolder",
              element: <SettingFolder />,
            },
            {
              path: "mainConfig",
              element: <MainConfig />,
            },
            {
              path: "optionConfig/Total",
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
            {
              path: "renameConfig",
              element: <RenameConfig />,
            },
            {
              path: "dataConfig",
              element: <DataConfig />,
            },
          ],
          loader: async () => {
            return intricateLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/prep",
          element: <PreparationTop />,
          loader: async () => {
            return prepLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/blueprint",
          element: <BlueprintTop />,
          loader: async () => {
            return blueprintLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/analysis",
          element: <AnalysisTop />,
          loader: async () => {
            return analysisLoader();
          },
          children: [
            {
              index: true,
              element: <></>,
            },
            {
              path: "data/:partsName",
              element: <PartsAnalysis />,
            },
          ],
          errorElement: <ErrorBoundary />,
        },

        {
          path: "/delete",
          element: <DeleteTop />,
          loader: async () => {
            return deleteLoader();
          },
          children: [
            {
              index: true,
              element: <DeletePairDatas />,
            },
          ],
          errorElement: <ErrorBoundary />,
        },

        {
          path: "/convert",
          element: <ConvertTop />,
          loader: async () => {
            return convertLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/export",
          element: <ExportTop />,
          loader: async () => {
            return exportLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/xrpl",
          element: <ExportXRPTop />,
          loader: async () => {
            return exportXRPLLoader();
          },
          errorElement: <ErrorBoundary />,
        },
        {
          path: "/other",
          element: <OtherTop />,
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

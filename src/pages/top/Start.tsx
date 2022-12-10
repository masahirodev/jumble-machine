import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import { ConfigDatas } from "../../schema/config";
import { linkTo } from "../../hooks/linkTo";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const Start = () => {
  const configDatas = useLoaderData() as ConfigDatas;
  const [editProjectId, setEditProjectId] = useState<number>(
    configDatas.edit === undefined ? 0 : configDatas.edit
  );
  const [projectName, setProjectName] = useState<string>("");
  const initSelect = "プロジェクトを選ぶ";
  const [delProjectId, setDelProjectId] = useState<number>(0);

  //続きから始めるプロジェクトのデフォルト値
  const editProjectName =
    configDatas.edit !== undefined
      ? configDatas.project.filter(
          (projectList) => projectList.projectId === editProjectId
        )[0].projectName
      : "";

  //ドロップダウンリストのプロジェクトの選択
  const select = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setEditProjectId: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (e.target.value !== initSelect) {
      const selectProjectId = configDatas.project.filter(
        (projectList) => projectList.projectName === e.target.value
      )[0].projectId;
      setEditProjectId(selectProjectId);
    }
  };

  //ProjectIdの最大値
  const maxProjectId =
    configDatas.edit !== undefined
      ? Math.max(
          ...configDatas.project.map((projectList) => projectList.projectId)
        ) + 1
      : 1;

  //新規作成
  const newEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const data =
      configDatas.project !== undefined
        ? configDatas.project.concat({
            projectName: projectName,
            projectId: maxProjectId,
          })
        : [
            {
              projectName: projectName,
              projectId: maxProjectId,
            },
          ];
    await window.storeApi.setStoreValue("config", "project", data);
    await window.storeApi.setStoreValue("config", "edit", maxProjectId);
    linkTo("design");
  };

  //続きから始める
  const continueEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await window.storeApi.setStoreValue("config", "edit", editProjectId);
    linkTo("design");
  };

  //プロジェクトを削除する
  const deleteProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (delProjectId !== 0) {
      const data = configDatas.project.filter(
        (projectList) => projectList.projectId !== delProjectId
      );
      const updateProjectId = data[0].projectId;
      await window.storeApi.setStoreValue("config", "project", data);
      await window.storeApi.setStoreValue("config", "edit", updateProjectId);
      //TODO jsonファイル削除
    }
  };

  //TODOプロジェクトの名前が変えられない

  return (
    <>
      <Container>
        <Row>
          <Form className="align-items-center">
            <Form.Group as={Row} className="m-2">
              <Form.Label column className="col-2">
                新規作成
              </Form.Label>
              <Col className="col-8">
                <Form.Control
                  type="string"
                  name={"projectName"}
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  placeholder="プロジェクトの名前を入力してね"
                />
              </Col>
              <Col>
                <Button onClick={newEdit}>次へ</Button>
              </Col>
            </Form.Group>
          </Form>

          <Form className="align-items-center">
            <Form.Group as={Row} className="m-2">
              <Form.Label column className="col-2">
                続きから始める
              </Form.Label>
              <Col className="col-8">
                <Form.Select
                  onChange={(e) => {
                    select(e, setEditProjectId);
                  }}
                  defaultValue={editProjectName}
                  disabled={configDatas.project === undefined}
                >
                  {configDatas.project !== undefined ? (
                    configDatas.project.map((projectList) => (
                      <option key={projectList.projectId}>
                        {projectList.projectName}
                      </option>
                    ))
                  ) : (
                    <option>{initSelect}</option>
                  )}
                </Form.Select>
              </Col>
              <Col>
                <Button
                  onClick={continueEdit}
                  disabled={configDatas.project === undefined}
                >
                  次へ
                </Button>
              </Col>
            </Form.Group>
          </Form>

          <Form className="align-items-center">
            <Form.Group as={Row} className="m-2">
              <Form.Label column className="col-2">
                プロジェクトを削除する
              </Form.Label>
              <Col className="col-8">
                <Form.Select
                  onChange={(e) => {
                    select(e, setDelProjectId);
                  }}
                  defaultValue={initSelect}
                  disabled={configDatas.project === undefined}
                >
                  <option>{initSelect}</option>
                  {configDatas.project !== undefined
                    ? configDatas.project.map((projectList) => (
                        <option key={projectList.projectId}>
                          {projectList.projectName}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </Col>
              <Col>
                <Button
                  onClick={deleteProject}
                  disabled={configDatas.project === undefined}
                  variant={"danger"}
                >
                  削除
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
};

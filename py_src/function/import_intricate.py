# coding: utf-8
import pandas as pd
from common.operate_json import overwrite_json
from function.import_excel import sort_df_by_list


def create_link_lists(data_lists, link):
    index_lists = list(set([x[link] for x in data_lists]))

    d_link = {}
    for index_list in index_lists:
        l = []
        for x in data_lists:
            if x[link] == index_list:
                d = x.copy()
                d.pop(link)
                d = {k: v for k, v in d.items() if v != "nan"}
                d["option"] = int(d["option"])
                l.append(d)
        d_link[index_list] = l
    return d_link


def import_intricate(projectPath, importFilePath):

    intricate_header = ["id", "folder", "combi", "rename",
                        "notRemove", "fileDatas", "property", "pairing"]
    fileData_header = ["fileDatas", "name", "option", "optionParts", "rename"]
    optionPart_header = ["optionParts", "folder", "name", "option", "property"]

    df = pd.read_excel(importFilePath, sheet_name=[
                       "intricateDatas", "fileDatas", "optionParts"])

    # optionParts
    link = "optionParts"
    data_lists = sort_df_by_list(df[link], optionPart_header)
    optionParts_link_lists = create_link_lists(data_lists, link)

    # fileDatas
    link = "fileDatas"
    data_lists = sort_df_by_list(df[link], fileData_header)

    for data_list in data_lists:
        target = data_list["optionParts"]

        if target != "nan":
            if target in optionParts_link_lists:
                data_list["optionParts"] = optionParts_link_lists[target]
            else:
                data_list["optionParts"] = ""

    fileDatas_link_lists = create_link_lists(data_lists, link)

    # intricateDatas
    link = "intricateDatas"
    data_lists = sort_df_by_list(df[link], intricate_header)

    for data_list in data_lists:
        target = data_list["fileDatas"]

        if target != "nan" and target in fileDatas_link_lists:
            data_list["fileDatas"] = fileDatas_link_lists[target]

    intricate_datas = []
    must_lists = ["id", "folder", "combi", "fileDatas", "pairing"]
    for data_list in data_lists:
        for must_list in must_lists:
            if data_list[must_list] == "nan":
                data_list[must_list] = ""

        d = {k: v for k, v in data_list.items() if v != "nan"}
        intricate_datas.append(d)

    updateData = {"intricateDatas": intricate_datas}
    overwrite_json(updateData, projectPath)
    return "ok"

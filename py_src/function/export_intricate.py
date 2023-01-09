# coding: utf-8
import os
import pandas as pd
from common.operate_json import read_json


def export_intricate(projectPath, export_folder):
    json_data = read_json(projectPath)
    intricate_datas = json_data["intricateDatas"]

    intricate_lists = []
    fileDatas_lists = []
    optionParts_lists = []

    for intricate_data in intricate_datas:
        link1 = "fileDatas" + str(intricate_data["id"])

        fileDatas = intricate_data["fileDatas"]
        for fileData in fileDatas:
            fileData["fileDatas"] = link1

        fileDatas_lists.extend(fileDatas)
        intricate_data["fileDatas"] = link1
        intricate_lists.append(intricate_data)

    i = 0
    for fileDatas_list in fileDatas_lists:
        if "optionParts" in fileDatas_list:
            link2 = "optionParts" + str(i)

            optionParts = fileDatas_list["optionParts"]
            for optionPart in optionParts:
                optionPart["optionParts"] = link2

            optionParts_lists.extend(optionParts)
            fileDatas_list["optionParts"] = link2

            i = i + 1

    intricate_header = ["id", "folder", "combi", "rename",
                        "notRemove", "fileDatas", "property", "pairing"]
    fileData_header = ["fileDatas", "name", "option", "optionParts", "rename"]
    optionPart_header = ["optionParts", "folder", "name", "option", "property"]

    df1 = pd.DataFrame(intricate_lists, columns=intricate_header)
    df2 = pd.DataFrame(fileDatas_lists, columns=fileData_header)
    df3 = pd.DataFrame(optionParts_lists, columns=optionPart_header)

    with pd.ExcelWriter(os.path.join(export_folder, "intricate.xlsx")) as writer:
        df1.to_excel(writer, sheet_name="intricateDatas", index=False)
        df2.to_excel(writer, sheet_name="fileDatas", index=False)
        df3.to_excel(writer, sheet_name="optionParts", index=False)

    return "ok"

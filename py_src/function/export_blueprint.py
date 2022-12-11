# coding: utf-8
import os
import pandas as pd
from common.operate_json import read_json


def make_main_data(data, mainHeader):
    df = pd.DataFrame()
    for i in range(0, len(mainHeader)):
        column = mainHeader[i]
        df[column] = [x[column] if column in x else "" for x in data]
    return df


def make_sub_data(data):
    df = pd.DataFrame()
    column = "subDatas"
    sub_data = [x[column] if column in x else "" for x in data]

    list_subData = []
    for i in range(0, len(sub_data)):
        d = {}
        [d.update({x["attribute"]: x["value"]}) for x in sub_data[i]]
        list_subData.append(d)

    df = pd.DataFrame(list_subData)
    return df


def make_export_data(path, mainHeader):
    data = read_json(path)
    data = data["blueprint"]
    df_main = make_main_data(data, mainHeader)
    df_sub = make_sub_data(data)
    df = pd.concat([df_main, df_sub], axis=1, join="inner")
    return df


def export_data(path, mainHeader, export_folder, export_format):
    df = make_export_data(path, mainHeader)
    if export_format == "excel":
        df.to_excel(os.path.join(export_folder, "blueprint.xlsx"),
                    index=False)
    elif export_format == "csv":
        df.to_csv(os.path.join(export_folder, "blueprint.csv"),
                  index=False, encoding="shift jis")
    return "ok"

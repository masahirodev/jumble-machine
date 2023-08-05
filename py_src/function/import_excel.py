# coding: utf-8
import pandas as pd
from common.operate_json import overwrite_json


# excel to df
def read_excel(xlsxFilePath):
    df = pd.read_excel(xlsxFilePath)
    # NaNを空白に置き換える
    df = df.fillna('')
    return df


# main data
def sort_df_by_list(df, sort_list):
    for item in sort_list:
        if not item in df.columns:
            df[item] = ""

    df = df[sort_list]

    main_list = []
    for j in range(0, len(df)):
        data = {}

        for i in range(0, len(sort_list)):
            if sort_list[i] == "id":
                if df[sort_list[i]][j] == "":
                    data.update(
                        {sort_list[i]: int(j)})
                else:
                    data.update(
                        {sort_list[i]: int(df[sort_list[i]][j])})
            else:
                data.update(
                    {sort_list[i]: str(df[sort_list[i]][j])})

        main_list.append(data)

    return main_list


# sub data
def sort_df_by_attribute(df, diff_list):

    sub_list = []
    for j in range(0, len(df)):
        data = []
        for i in range(0, len(diff_list)):
            data.append(
                {"attribute": diff_list[i], "value": str(df[diff_list[i]][j])})
        sub_list.append(data)

    return sub_list


def make_diff_list(list1, list2):
    diff_list = []
    for elem in list1:
        if elem not in list2:
            diff_list.append(elem)
    return diff_list


# main + sub
def concat_list(list1, list2):
    for i in range(0, len(list1)):
        list1[i].update(
            {"subDatas": list2[i]})
    return list1


def import_excel(projectPath, path, sort_list):
    df = read_excel(path)
    main_list = sort_df_by_list(df, sort_list)
    diff_list = make_diff_list(df.columns, sort_list)
    sub_list = sort_df_by_attribute(df, diff_list)
    data = concat_list(main_list, sub_list)

    updateData = {"blueprint": data}
    overwrite_json(updateData, projectPath)
    return "ok"

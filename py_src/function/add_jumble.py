# coding: utf-8
import random
import numpy as np

from function.jumble import make_factory
from function.intricate_jumble import result_jumble_datas, update_blueprint
from common.operate_json import read_json, overwrite_json


def create_compare_lists(factory_datas):
    compare_lists = []
    for x in factory_datas:
        x.pop("id")
        compare_lists.append(x)
    return compare_lists


def add_intricate_jumble(projectPath):
    #追加するデータを作成
    df, df_subDatas = result_jumble_datas(projectPath)
    create_number = len(df_subDatas)

    factory = make_factory(df_subDatas)
    new_parts_lists = create_compare_lists(factory)


    #既存データ
    json_data = read_json(projectPath)
    exist_factory_datas = json_data["factory"]
    start_id = max([x["id"] for x in exist_factory_datas]) + 1
    exist_parts_lists = create_compare_lists(exist_factory_datas)


    #追加するデータの抽出
    seen = []
    add_parts_indexs = [
        i for i, x in enumerate(new_parts_lists) if x not in exist_parts_lists and not seen.append(x)]

    json_data = read_json(projectPath)
    add_quantity = int(json_data["add"]["quantity"])

    if len(add_parts_indexs) > add_quantity:
        add_parts_indexs = random.sample(add_parts_indexs, add_quantity)

    df_subDatas = df_subDatas.filter(items = add_parts_indexs, axis = 0)
    df_subDatas.index = np.arange(start_id, start_id + len(df_subDatas))

    quantity = len(add_parts_indexs)


    #df修正
    df = df.filter(items = add_parts_indexs, axis = 0)
    df.index = np.arange(start_id, start_id + len(df))

    for i in range(0,len(df)):
        text = df.at[df.index[i],"name"]
        text = text.replace(str(df.at[df.index[i],"id"] + 1).zfill(len(str(create_number))), str(df.index[i] + 1))
        df.at[df.index[i],"name"] = text
    df["id"] = df.index

    updateData = update_blueprint(projectPath, df, df_subDatas)


    #既存のデータに追加
    json_data = read_json(projectPath)
    factory = json_data["factory"]
    blueprint = json_data["blueprint"]

    add_factory = updateData["factory"]
    add_blueprint = updateData["blueprint"]

    factory.extend(add_factory)
    blueprint.extend(add_blueprint)

    updateData = {"factory": factory, "blueprint": blueprint}
    overwrite_json(updateData, projectPath)

    return quantity

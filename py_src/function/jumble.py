# coding: utf-8
import os
import pandas as pd
import random
from common.operate_json import read_json, overwrite_json


# データの取り込み
def organize_data(projectPath):
    json_data = read_json(projectPath)
    design_datas = json_data["designDatas"]
    prep_data = json_data["prep"]
    return design_datas, prep_data


# NFT設定
def configNFT(prep_data):
    create_number = int(prep_data["quantity"])
    nft_name = prep_data["name"]
    del prep_data["quantity"], prep_data["name"]
    return create_number, nft_name, prep_data


def create_data_set(design_datas):
    # パーツリスト
    parts_list = [x["folder"] for x in design_datas]
    parts_sublist = [x["folder"] for x in design_datas]

    # ペアリスト
    pair_list = [x["combi"] for x in design_datas]
    pair_sublist = list(set([x["combi"]
                        for x in design_datas if x["combi"] != ""]))

    # ペア同士をまとめる
    pair_setlist = []
    for i in range(0, len(pair_sublist)):
        indexes = [n for n, x in enumerate(pair_list) if x == pair_sublist[i]]
        sub_list = [pair_sublist[i]]
        for j in range(0, len(indexes)):
            sub_list.append(parts_sublist[indexes[j]])
        pair_setlist.append(sub_list)

    # parts_listよりpair_listを省く
    for j in range(0, len(pair_setlist)):
        for i in range(1, len(pair_setlist[j])):
            parts_sublist.remove(pair_setlist[j][i])

    # 各パーツを格納
    item_list = [0]*len(parts_sublist)
    rare_list = [0]*len(parts_sublist)

    for i in range(len(parts_sublist)):
        fileDatas = [x["fileDatas"]
                     for x in design_datas if x["folder"] == parts_sublist[i]]
        item_list[i] = [x["name"] for x in fileDatas[0]]
        rare_list[i] = [x["option"] for x in fileDatas[0]]

    return parts_list, parts_sublist, pair_setlist, item_list, rare_list


# 重み付け排出
def jumble_func(parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number):

    weight_list = rare_list
    for i in range(len(weight_list)):
        max_rare = max(rare_list[i])
        for n in range(len(weight_list[i])):
            weight_list[i][n] = max_rare + 1 - weight_list[i][n]

    # パーツをチョイス
    parts_choice = []
    while len(parts_choice) < create_number:
        combination_list = []
        for target in parts_sublist:
            i = parts_sublist.index(target)
            combination = random.choices(
                item_list[i], k=1, weights=weight_list[i])
            combination_list.extend(combination)
        if combination_list not in parts_choice:
            parts_choice.append(combination_list)

    # 重複削除
    seen = []
    parts_choice = [
        x for x in parts_choice if x not in seen and not seen.append(x)]

    # データ整理
    df = pd.DataFrame(parts_choice, columns=parts_sublist)

    # pair_list分を追加する
    for j in range(0, len(pair_setlist)):
        for i in range(1, len(pair_setlist[j])):
            df[pair_setlist[j][i]] = df[pair_setlist[j][0]]
    df_subDatas = df.reindex(columns=parts_list)
    return df_subDatas


# metadata作成
def create_metadata(prep_data, create_number, nft_name):
    # prepdataの残りのデータを反映する
    df = pd.DataFrame(data=prep_data, index=list(
        range(create_number)), columns=list(prep_data))

    # 名前を追加
    name_list = []
    for i in range(0, create_number):
        name_list.append(nft_name + str(i+1).zfill(len(str(create_number))))

    df.insert(0, "name", name_list)

    # idを追加
    df.insert(0, "id", range(0, len(df.index)))

    return df


# factoryを作成
def make_factory(df):
    d = df.to_dict(orient="index")
    factory = []
    for i in range(0, len(d)):
        factory.append({**{"id": i}, **d[i]})
    return factory


# メタデータを作成
def make_blueprint(df, df_subDatas, create_number, projectPath):
    json_data = read_json(projectPath)
    rename_lists = [{x["folder"]:x["rename"]}
                    for x in json_data["designDatas"] if "rename" in x]
    remove_lists = [x["folder"] for x in json_data["designDatas"]
                    if "property" in x and x["property"] is False]

    for i in range(0, len(rename_lists)):
        df_subDatas = df_subDatas.rename(columns=rename_lists[i])
        remove_lists = [rename_lists[i][x]
                        if x in rename_lists[i] else x for x in remove_lists]

    for i in range(0, len(remove_lists)):
        df_subDatas = df_subDatas.drop(columns=remove_lists[i])

    # データ整理（df=>dict）
    dict_main = df.to_dict(orient="index")

    table = []
    for i in range(0, create_number):
        subDatas = []
        for j in list(df_subDatas.columns):
            d = {"attribute": j, "value": os.path.splitext(df_subDatas[j][i])[
                0]}
            subDatas.append(d)

        dm = dict_main[i]
        dm.update({"subDatas": subDatas})
        table.append(dm)

    return table


def do_jumble(projectPath):
    design_datas, prep_data = organize_data(projectPath)
    create_number, nft_name, prep_data = configNFT(prep_data)

    parts_list, parts_sublist, pair_setlist, item_list, rare_list = create_data_set(
        design_datas)

    df = create_metadata(prep_data, create_number, nft_name)

    df_subDatas = jumble_func(
        parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number)

    factory = make_factory(df_subDatas)
    blueprint = make_blueprint(df, df_subDatas, create_number, projectPath)

    updateData = {"factory": factory, "blueprint": blueprint}
    overwrite_json(updateData, projectPath)
    return "ok"

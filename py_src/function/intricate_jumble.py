# coding: utf-8
import pandas as pd
import random
import numpy as np
import math
import itertools

from common.operate_json import read_json, overwrite_json
from function.jumble import jumble_func, make_factory, make_blueprint, configNFT, create_data_set, create_metadata


def organize_data(projectPath):
    json_data = read_json(projectPath)
    intricate_datas = json_data["intricateDatas"]

    sort_datas = {x["folder"]: x["id"] for x in intricate_datas}

    main_datas = [x for x in intricate_datas if
                  x["pairing"] == "main" or x["pairing"] == "bg"]

    main_datas = [{"property": "default"} | x for x in main_datas]

    for data in main_datas:
        if data["combi"] != "":
            data["property"] = [x["property"]
                                for x in main_datas if x["folder"] == data["combi"]][0]

    design_datas = [x for x in main_datas if x["property"] == "default"]
    fixed_datas = [x for x in main_datas if x["property"] == "fixed"]
    random_datas = [x for x in main_datas if x["property"] == "random"]

    option_datas = []
    for x in main_datas:
        for y in x["fileDatas"]:
            if "optionParts" in y:
                d = ({"folder": x["folder"], "name": y["name"],
                     "optionParts": y["optionParts"]})
                option_datas.append(d)

    prep_data = json_data["prep"]
    return sort_datas, design_datas, prep_data, fixed_datas, random_datas, option_datas


# 個数制限排出
def quantity_limit(quantity_list, create_number):
    total = sum(quantity_list)

    if total > create_number:
        k = create_number / total
        quantity_list = [math.floor(x * k) for x in quantity_list]

        total = sum(quantity_list)
        for i in range(0, create_number - total):
            random_list = [0]*len(quantity_list)
            index = random.randrange(len(random_list))
            random_list[index] = 1

            quantity_list = np.array(quantity_list) + np.array(random_list)
    return quantity_list


# 個数排出
def select_fixed(parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number):

    # パーツをチョイス
    parts_choice = []

    for j in range(0, len(item_list)):
        l = []
        quantity_list = quantity_limit(rare_list[j], create_number)

        # この中で制限する必要がある
        for i in range(0, len(item_list[j])):
            l.append([item_list[j][i]] * quantity_list[i])

        count = sum([len(v) for v in l])
        l.append([""]*(create_number - count))
        l = list(itertools.chain.from_iterable(l))
        random.shuffle(l)
        parts_choice.append(l)

    # データ整理
    df = pd.DataFrame(parts_choice, index=parts_sublist)
    df = df.T

    # pair_list分を追加する
    for j in range(0, len(pair_setlist)):
        for i in range(1, len(pair_setlist[j])):
            df[pair_setlist[j][i]] = df[pair_setlist[j][0]]
    df_subDatas = df.reindex(columns=parts_list)

    return df_subDatas


# ランダム制限
def random_limit(quantity_list, create_number):
    total = sum(quantity_list)

    if total > 100:
        k = 100 / total
        quantity_list = [math.floor(create_number * x / 100 * k)
                         for x in quantity_list]

        total = sum(quantity_list)
        for i in range(0, create_number - total):
            random_list = [0]*len(quantity_list)
            index = random.randrange(len(random_list))
            random_list[index] = 1

            quantity_list = np.array(quantity_list) + np.array(random_list)
    else:
        quantity_list = [math.floor(create_number * x / 100)
                         for x in quantity_list]

    return quantity_list


# ランダム排出
def select_random(parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number):

    # パーツをチョイス
    parts_choice = []

    for j in range(0, len(item_list)):
        l = []
        quantity_list = random_limit(rare_list[j], create_number)

        # この中で制限する必要がある
        for i in range(0, len(item_list[j])):
            l.append([item_list[j][i]] * quantity_list[i])

        count = sum([len(v) for v in l])
        l.append([""]*(create_number - count))
        l = list(itertools.chain.from_iterable(l))
        random.shuffle(l)
        parts_choice.append(l)

    # データ整理
    df = pd.DataFrame(parts_choice, index=parts_sublist)
    df = df.T

    # pair_list分を追加する
    for j in range(0, len(pair_setlist)):
        for i in range(1, len(pair_setlist[j])):
            df[pair_setlist[j][i]] = df[pair_setlist[j][0]]
    df_subDatas = df.reindex(columns=parts_list)

    return df_subDatas


# オプションパーツの追加
def add_option_parts(option_datas, df_subDatas):
    for option in option_datas:
        # データ整理
        total = (df_subDatas[option["folder"]] == option["name"]).sum()
        fixed_list = [x for x in option["optionParts"]
                      if x["property"] == "fixed"]
        random_list = [x for x in option["optionParts"]
                       if x["property"] == "random"]

        # fixed
        quantity_fixed_list = [x["option"] for x in fixed_list]
        quantity = sum(quantity_fixed_list)
        if quantity > 0:
            if quantity > total:
                quantity_fixed_list = quantity_limit(
                    quantity_fixed_list, total)

        # random
        quantity_random_list = [x["option"] for x in random_list]
        quantity = total - sum(quantity_fixed_list)
        quantity_random_list = random_limit(quantity_random_list, quantity)

        # パーツ抽出
        l = []
        for i in range(0, len(fixed_list)):
            d = {option["folder"]: option["name"],
                 fixed_list[i]["folder"]: fixed_list[i]["name"]}
            d = {fixed_list[i]["folder"]: fixed_list[i]["name"]}

            l.append([d] * quantity_fixed_list[i])

        for i in range(0, len(random_list)):
            d = {option["folder"]: option["name"],
                 random_list[i]["folder"]: random_list[i]["name"]}
            d = {random_list[i]["folder"]: random_list[i]["name"]}

            l.append([d] * quantity_random_list[i])

        # データ整理
        l = list(itertools.chain.from_iterable(l))

        if len(l) != 0:
            random.shuffle(l)
            df = pd.DataFrame(l)

            df_subDatas_true = df_subDatas[df_subDatas[option["folder"]]
                                           == option["name"]]

            df_subDatas_false = df_subDatas[df_subDatas[option["folder"]]
                                            != option["name"]]

            df_check = pd.concat(
                [df_subDatas_true.reset_index(drop=True), df], axis=1)

            # 重複処理
            check_l = list(df_check.columns)
            duplication_l = [x for x in set(check_l) if check_l.count(x) > 1]

            if len(duplication_l) == 0:
                df_subDatas_true = df_check
            else:
                df_subDatas_true = pd.concat(
                    [df_subDatas_true.drop(duplication_l, axis=1).reset_index(drop=True), df], axis=1)

            df_subDatas = pd.concat(
                [df_subDatas_true, df_subDatas_false])

            df_subDatas = df_subDatas.reset_index(drop=True)

    return df_subDatas


# 並び替え
def sort_columns(df_subDatas, sort_datas):
    sort_columns = sorted(df_subDatas.columns, key=lambda x: sort_datas[x])
    return df_subDatas[sort_columns]


# 名前の変更
def do_rename(projectPath, df_subDatas):
    json_data = read_json(projectPath)
    rename_lists = [{x["folder"]:x["rename"]}
                    for x in json_data["intricateDatas"] if "rename" in x]

    rename_lists2 = []
    for x in json_data["intricateDatas"]:
        for y in x["fileDatas"]:
            if "rename" in y:
                d = {"folder": x["folder"],
                     "file": y["name"], "rename": y["rename"]}
                rename_lists2.append(d)

    remove_lists = [x["folder"] for x in json_data["intricateDatas"]
                    if "notRemove" in x and x["notRemove"] is False]

    for x in rename_lists2:
        df_subDatas[x["folder"]] = df_subDatas[x["folder"]].where(
            df_subDatas[x["folder"]] != x["file"], x["rename"])

    for i in range(0, len(rename_lists)):
        df_subDatas = df_subDatas.rename(columns=rename_lists[i])
        remove_lists = [rename_lists[i][x]
                        if x in rename_lists[i] else x for x in remove_lists]

    for i in range(0, len(remove_lists)):
        df_subDatas = df_subDatas.drop(columns=remove_lists[i])

    return df_subDatas



def result_jumble_datas(projectPath):
    sort_datas, design_datas, prep_data, fixed_datas, random_datas, option_datas = organize_data(
        projectPath)

    create_number, nft_name, prep_data = configNFT(prep_data)
    df = create_metadata(prep_data, create_number, nft_name)

    # 重み付け排出
    parts_list, parts_sublist, pair_setlist, item_list, rare_list = create_data_set(
        design_datas)

    df_subDatas_jumble = jumble_func(
        parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number)

    # 個数制限排出
    parts_list, parts_sublist, pair_setlist, item_list, rare_list = create_data_set(
        fixed_datas)

    df_subDatas_fixed = select_fixed(
        parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number)

    # ランダム排出
    parts_list, parts_sublist, pair_setlist, item_list, rare_list = create_data_set(
        random_datas)

    df_subDatas_random = select_random(
        parts_list, parts_sublist, pair_setlist, item_list, rare_list, create_number)

    df_subDatas = pd.concat(
        [df_subDatas_jumble, df_subDatas_fixed, df_subDatas_random], axis=1)

    # オプション
    df_subDatas = add_option_parts(option_datas, df_subDatas)
    df_subDatas = df_subDatas.fillna("")
    df_subDatas = sort_columns(df_subDatas, sort_datas)

    # シャッフル
    df_subDatas = df_subDatas.sample(frac=1, ignore_index=True)
    return df, df_subDatas


def update_blueprint(projectPath, df, df_subDatas):
    factory = make_factory(df_subDatas)
    df_subDatas = do_rename(projectPath, df_subDatas)
    blueprint = make_blueprint(df, df_subDatas)
    updateData = {"factory": factory, "blueprint": blueprint}
    return updateData


def do_intricate_jumble(projectPath):
    df, df_subDatas = result_jumble_datas(projectPath)
    updateData = update_blueprint(projectPath, df, df_subDatas)
    overwrite_json(updateData, projectPath)
    return "ok"

# coding: utf-8
import os
from common.operate_json import read_json, write_json


def export_json(path, folderPath):
    json_load = read_json(path)
    table = json_load["blueprint"]

    for i in range(0, len(table)):
        # jsonファイル名をidに連動させる
        id = table[i]["id"]
        table[i].pop("id", None)
        table[i].pop("tokenId", None)
        table[i].pop("imagePath", None)

        attributes = []

        for sub_data in table[i]["subDatas"]:
            attributes.append({
                "trait_type": sub_data["attribute"],
                "value": sub_data["value"],
            })
        table[i]["attributes"] = attributes
        table[i].pop("subDatas")

        path = os.path.join(folderPath, str(id)+".json")
        write_json(path, table[i])

    return "OK"

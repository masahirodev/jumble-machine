# coding: utf-8
import os
from common.operate_json import read_json, write_json


def export_xrpl(path, folderPath):
    json_load = read_json(path)
    table = json_load["blueprint"]
    collectionData = json_load["collection"]

    for i in range(0, len(table)):
        # jsonファイル名をidに連動させる
        id = table[i]["id"]
        table[i].pop("id", None)
        table[i].pop("tokenId", None)
        table[i].pop("imagePath", None)
        table[i].pop("background_color", None)
        table[i].pop("external_url", None)
        table[i].pop("youtube_url", None)

        # animation
        if table[i]["animation_url"] != "":
            table[i]["animation"] = table[i]["animation_url"]

        table[i].pop("animation_url", None)

        # collection data
        collection = {}

        if collectionData["collectionName"] != "":
            collection.update({
                "name": collectionData["collectionName"]
            })

        if collectionData["collectionDescription"] != "":
            collection.update({
                "description": collectionData["collectionDescription"]
            })

        if collectionData["collectionImage"] != "":
            collection.update({
                "image": collectionData["collectionImage"]
            })

        if collection:
            table[i]["collection"] = collection

        # attributes
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

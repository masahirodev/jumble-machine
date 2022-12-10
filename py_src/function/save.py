# coding: utf-8
from common.operate_json import read_json, overwrite_json


def save_image(projectPath, img, imgPath, ani, aniPath):
    json_load = read_json(projectPath)
    data = json_load["blueprint"]

    for i in range(0, len(data)):
        if img == True:
            data[i]["image"] = imgPath + str(data[i]["tokenId"]) + ".png"
        if ani == True:
            data[i]["animation_url"] = aniPath + \
                str(data[i]["tokenId"]) + ".png"

    updateData = {"blueprint": data}
    overwrite_json(updateData, projectPath)
    return "ok"

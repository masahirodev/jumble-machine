# coding: utf-8
import os
import shutil
from common.operate_json import read_json, overwrite_json


def adjust_image(projectPath, name, tokenId, export_path):
    json_load = read_json(projectPath)
    data = json_load["blueprint"]

    for i in range(0, len(data)):
        data[i].update({"tokenId": tokenId})

        move_path = os.path.join(export_path, name + str(tokenId) + ".png")
        if "imagePath" in data[i] and os.path.isfile(data[i]["imagePath"]):
            shutil.move(data[i]["imagePath"], move_path)
            data[i]["imagePath"] = move_path

        tokenId = tokenId + 1

    updataData = {"blueprint": data}
    overwrite_json(updataData, projectPath)
    return "ok"

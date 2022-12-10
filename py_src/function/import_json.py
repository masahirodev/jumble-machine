# coding: utf-8
import os
import glob

from common.operate_json import read_json, overwrite_json


def get_json(folderPath):
    files = glob.glob(os.path.join(folderPath, "*.json"))
    data = []

    for i in range(0, len(files)):
        json_load = read_json(files[i])
        data.append(json_load)

    for d in data:
        if not "id" in d:
            i = i + 1
            d.update({"id": int(i+1)})
        else:
            d.update({"id": int(d["id"])})

    data = sorted(data, key=lambda x: int(x["id"]))
    return data


def import_json(projectPath, folderPath):
    data = get_json(folderPath)
    updateData = {"blueprint": data}
    overwrite_json(updateData, projectPath)
    return "ok"

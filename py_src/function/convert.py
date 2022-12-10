# coding: utf-8
from common.operate_json import read_json, overwrite_json


# データ置換
def convert(data, key, update_value, link, symbol):
    for d in data:
        if symbol != "" and symbol in update_value:
            value = update_value.replace(symbol, str(d[link]))
        else:
            value = update_value

        if key in d:
            d.update({key: value})

        sub = d["subDatas"]
        for d2 in sub:
            if key in d2.values():
                d2.update({"attribute": key, "value": value})
        d.update({"subDatas": sub})

    return data


def convert_property(projectPath, key, value, link, symbol):
    data = read_json(projectPath)
    data = data["blueprint"]
    data = convert(data, key, value, link, symbol)
    updateData = {"blueprint": data}
    overwrite_json(updateData, projectPath)
    return "ok"

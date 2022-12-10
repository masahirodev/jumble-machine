# coding: utf-8
import json

# jsonファイルの読み込み


def read_json(projectPath):
    json_open = open(projectPath, "r", encoding="utf-8")
    json_load = json.load(json_open)
    return json_load


# jsonファイルの保存
def write_json(path, data):
    with open(path, 'w', encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


# jsonデータの上書き
def overwrite_json(updateData, projectPath):
    json_data = read_json(projectPath)
    json_data.update(updateData)
    write_json(projectPath, json_data)

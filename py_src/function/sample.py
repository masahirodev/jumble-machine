# coding: utf-8
import os
from PIL import Image
from common.operate_json import read_json


def make_sample(projectPath, export_path):
    json_load = read_json(projectPath)
    import_path = json_load["importPath"]
    sample_data = json_load["sample"]

    # 画像を出力する
    base_image_path = os.path.join(
        import_path, sample_data[0]["folder"], sample_data[0]["file"])
    base_image = Image.open(base_image_path)
    sample_path = os.path.join(export_path, "sample.png")

    for i in range(1, len(sample_data)):
        img_path = os.path.join(
            import_path, sample_data[i]["folder"], sample_data[i]["file"])
        img = Image.open(img_path)
        base_image.paste(img, (0, 0), img)
        base_image.save(sample_path)

    return sample_path

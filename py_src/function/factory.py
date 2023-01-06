# coding: utf-8
import os
from PIL import Image
from common.operate_json import read_json


def run_factory(projectPath, id, export_path):
    json_load = read_json(projectPath)
    import_path = json_load["importPath"]

    target = [x for x in json_load["factory"] if x["id"] == id][0]
    target_parts = [v for k, v in enumerate(target)]

    # 画像を出力する
    base_image_path = os.path.join(
        import_path, target_parts[1], target[target_parts[1]])
    base_image = Image.open(base_image_path)
    sample_path = os.path.join(export_path, str(id) + ".png")

    for i in range(2, len(target_parts)):

        if target[target_parts[i]] != "":
            img_path = os.path.join(
                import_path, target_parts[i], target[target_parts[i]])

            img = Image.open(img_path)
            base_image.paste(img, (0, 0), img)
            base_image.save(sample_path)

    return sample_path

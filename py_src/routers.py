from fastapi import APIRouter
from pydantic import BaseModel


from function.sample import make_sample
from function.jumble import do_jumble
from function.factory import run_factory
from function.adjust import adjust_image
from function.save import save_image
from function.export import export_json
from function.convert import convert_property
from function.import_json import import_json
from function.import_excel import import_excel
from function.export_blueprint import export_data

router = APIRouter()


class ExportArg(BaseModel):
    projectId: int
    folderPath: str


class ExportData(BaseModel):
    projectPath: str
    arg: ExportArg


@router.post("/exportJson")
async def exportJson(data: ExportData) -> str:
    return export_json(data.projectPath, data.arg.folderPath)


class SampleData(BaseModel):
    projectPath: str
    exportPath: str


@router.post("/makeSample")
async def makeSample(data: SampleData) -> str:
    return make_sample(data.projectPath, data.exportPath)


class JumbleArg(BaseModel):
    projectId: int


class JumbleData(BaseModel):
    projectPath: str
    arg: JumbleArg


@router.post("/jumble")
async def jumble(data: JumbleData) -> str:
    return do_jumble(data.projectPath)


class FactoryArg(BaseModel):
    projectId: int
    i: int
    exportPath: str


class FactoryData(BaseModel):
    projectPath: str
    arg: FactoryArg


@router.post("/factory")
async def factory(data: FactoryData) -> str:
    return run_factory(data.projectPath, data.arg.i, data.arg.exportPath)


class AdjustArg(BaseModel):
    projectId: int
    name: str
    tokenId: int
    exportPath: str


class AdjustData(BaseModel):
    projectPath: str
    arg: AdjustArg


@router.post("/adjustImage")
async def adjustImage(data: AdjustData) -> str:
    return adjust_image(data.projectPath, data.arg.name, data.arg.tokenId, data.arg.exportPath)


class SaveImageArg(BaseModel):
    projectId: int
    img: bool
    imgPath: str
    ani: bool
    aniPath: str


class SaveImageData(BaseModel):
    projectPath: str
    arg: SaveImageArg


@router.post("/saveImage")
async def saveImage(data: SaveImageData) -> str:
    return save_image(data.projectPath, data.arg.img, data.arg.imgPath, data.arg.ani, data.arg.aniPath)


class ConvertArg(BaseModel):
    projectId: int
    key: str
    value: str
    link: str
    symbol: str


class ConvertData(BaseModel):
    projectPath: str
    arg: ConvertArg


@router.post("/convert")
async def convert(data: ConvertData) -> str:
    return convert_property(data.projectPath, data.arg.key, data.arg.value, data.arg.link, data.arg.symbol)


class ImportJsonArg(BaseModel):
    projectId: int
    folderPath: str


class ImportJsonData(BaseModel):
    projectPath: str
    arg: ImportJsonArg


@router.post("/importJson")
async def importJson(data: ImportJsonData) -> str:
    return import_json(data.projectPath, data.arg.folderPath)


class ImportExcelArg(BaseModel):
    projectId: int
    filePath: str
    sortList: list[str]


class ImportExcelData(BaseModel):
    projectPath: str
    arg: ImportExcelArg


@router.post("/importExcel")
async def importExcel(data: ImportExcelData) -> str:
    return import_excel(data.projectPath, data.arg.filePath, data.arg.sortList)


class ExportBlueprintArg(BaseModel):
    projectId: int
    sortList: list[str]
    exportPath: str
    export_format: str


class ExportBlueprintData(BaseModel):
    projectPath: str
    arg: ExportBlueprintArg


@router.post("/exportData")
async def exportData(data: ExportBlueprintData) -> str:
    return export_data(data.projectPath, data.arg.sortList, data.arg.exportPath, data.arg.export_format)


# test
class TestData(BaseModel):
    word: str


@router.post("/helloWorld")
async def helloWorld(data: TestData) -> str:
    if data.word == "Hello":
        return "OK"

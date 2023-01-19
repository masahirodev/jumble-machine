# 注意事項

本ツールの作成者は、非 IT エンジニアです。

本ツールは、風の吹くまま気の向くままをモットーに作られたものです。
お世話になっているクリエイターさんのために、今できる全てをぶつけたものになっています。

<br>

セキュリティ関係含め、相当勉強したつもりではありますが、どこに落とし穴があるかわかりません。

「本アプリは、あなたのパソコンに保存されているデータの操作を行います。（あなたの操作をもとに）」

そのため、本ツールを使用して何が起ころうとも、全て自己責任でお願いします。
上記内容にご同意頂いた方のみご利用ください。

<br>

## メンバーシップについて

私の気分をもってして（メンバーシップ申し込みのサイト作ったらかな？）、メンバーシップ制度が適用されます。
なお、コントラクト側でメンバーシップ制度の適用が実行出来るようになっています。

1. 本ツールは、急遽サービス終了になる可能性があります。
2. 保守、アップデート等は、予定しておりません。（arweave,xrp フォルダがあるのは気のせいです）
3. 会員制度は単なるネタなので、無くなるかもしれないし、コストも適当です。全て気の向くままに

<br>
<br>
<br>

# Electron の使い方など

## まずは、npm パッケージのインストール

```
npm i
```

## python 関係の準備

```
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

## 立ち上げ

```
.\venv\Scripts\activate
npm start
```

## build 関係について

| OS      | コマンド                   | 備考               |
| ------- | -------------------------- | ------------------ |
| windows | `npm run dist:win-publish` | auto update する   |
| windows | `npm run dist:win-never`   | auto update しない |
| mac     | `npm run dist:mac`         | auto update しない |
| mac m1  | `npm run dist:mac-m1`      | auto update しない |
| linux   | `npm run dist:linux`       | auto update しない |

なお、auto update のやり方は複数あります。
現状、Github の release 経由での auto update に対応しています。
レポジトリ内に「electron-builder.env」というファイルと作り、その中に「Personal access tokens」を埋め込みます。
`GH_TOKEN=<access tokens>`

あとは、`dist:win-publish`で OK。なお、publish したくない場合は、`dist:win-never`

<br>

# fastapi について

## fastAPI 単独のテスト立ち上げなど

### windows

```
.\venv\Scripts\activate
cd py_src
uvicorn main:app --reload
```

### mac

```
python -m venv venv
source venv/bin/activate
cd py_src
uvicorn main:app --reload
```

## fastAPI の便利な機能

| 内容  | URL                           |
| ----- | ----------------------------- |
| docs  | `http://localhost:8000/docs`  |
| redoc | `http://127.0.0.1:8000/redoc` |

## その他コマンド

| 内容                     | コマンド（Windows）               | コマンド（Mac）                   |
| ------------------------ | --------------------------------- | --------------------------------- |
| 仮想環境スタート　       | `.\venv\Scripts\activate`         | `source ./venv/bin/activate`      |
| 仮想環境ストップ         | `deactivate`                      | `deactivate`                      |
| パッケージのインストール | `pip install -r requirements.txt` | `pip install -r requirements.txt` |
| パッケージの書き出し     | `pip freeze -> requirements.txt`  | `pip freeze -> requirements.txt`  |

※パッケージの書き出しで作った requirements を使うと fastAPI or uvicorn 関連のパッケージにエラーが生じる

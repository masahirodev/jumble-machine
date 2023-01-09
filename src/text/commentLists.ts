export const commentLists = [
  { target: "defalut", comment: "・・・" },
  { target: "start", comment: "今日は、どんなプロジェクトを作って楽しむ？" },
  {
    target: "/",
    comment: [
      "まずは、WalletConnectよりウォレットを接続してね。ウォレットが接続されると、接続したウォレットのアドレスを取得します。取得したアドレスを元にメンバーシップが有効か確認するよ。",
    ],
  },
  {
    target: "loginNotConnect",
    comment: "ブロックチェーンにつながらないみたい・・・",
  },
  {
    target: "loginSuccess",
    comment:
      "メンバーシップへようこそ！もうウォレットの接続を解除しても大丈夫なので、右側のボタンを押して接続を解除してもいいよ。",
  },
  {
    target: "loginFalse",
    comment: "このアドレスは、メンバーシップが有効じゃないみたい・・・",
  },
  {
    target: "/design",
    comment: [
      "一般的なジェネラティブをするときに使うよ。複雑なジェネラティブを行いたい場合は、Intricateを使ってね。",
      "まずは、パーツデータを読み込もう！",
    ],
  },
  {
    target: "hasDesignDatas",
    comment: "どんなジェネラティブをしようかな",
  },
  {
    target: "designDescriptionPairParts",
    comment:
      "この欄には、ジェネラティブを行った際にペアにしたいパーツを設定するよ。",
  },
  {
    target: "designDescriptionProperty",
    comment: [
      "この欄には、メタデータに書き込むプロパティの名前を変更したいときに記入するよ。",
      "後から変更することも可能だよ。",
    ],
  },
  {
    target: "designDescriptionPropertyDropdown",
    comment:
      "この欄では、メタデータに表示したくないプロパティを非表示にすることが出来るよ。",
  },
  {
    target: "designDescriptionSample",
    comment: [
      "この欄では、サンプルデータの選択をすることが出来るよ。パーツを選んでサンプル機能を押してみてね。",
      "隣にある数字は、ジェネラティブしたときのだいたいの排出率を設定することが出来るよ。",
    ],
  },
  {
    target: "designDescriptionSort",
    comment: "ここを上下に動かすことでパーツの並び替えが出来るよ。",
  },
  {
    target: "preopen",
    comment: "β版の間は、会員証のチェックはされません。",
  },
  {
    target: "intricateSampleButton",
    comment: [
      "このボタンを押すと、ジェネラティブしたときのサンプルを表示させることが出来るよ。",
      "どの組み合わせ・どの順番でジェネラティブするかは、下の表で設定してね。",
    ],
  },
  {
    target: "commonSaveButton",
    comment: [
      "編集が終わったら、必ず保存ボタンを押してね。",
      "今は、あえて、自動保存には対応してないんだ。",
    ],
  },
  {
    target: "intricateNext",
    comment: [
      "ジェネラティブの設定が終わったら、次へを押してね。",
      "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
    ],
  },
  {
    target: "intricateEmissionDescription",
    comment: [
      "ここでは、ジェネラティブの排出設定ができるよ。",
      "隣にある数字は、ジェネラティブしたときの排出率を設定することが出来るよ。",
    ],
  },
  {
    target: "intricateDescriptionSample",
    comment:
      "この欄では、サンプルデータの選択をすることが出来るよ。パーツを選んでサンプル機能を押してみてね。",
  },
  {
    target: "intricateEmissionDescriptionOptionparts",
    comment: ["ここでは、オプションパーツの排出設定ができるよ。"],
  },
  {
    target: "quantity",
    comment: [
      "quantityには、ジェネラティブして出力するデータの数を入力してね。",
      "※必ずパーツの組合せ総数よりも少なくなるように設定してね。",
    ],
  },
  {
    target: "name",
    comment: ["nameには、NFTの名前を入力してね。自動的に連番になるよ。"],
  },
  {
    target: "description",
    comment: ["descriptionには、NFTの説明を入力してね。"],
  },
  {
    target: "background_color",
    comment: [
      "OpenSeaにおけるNFTの背景色を入力してね。先頭に#を付けない6文字の16進数で記入する必要があるよ。",
    ],
  },
  {
    target: "image",
    comment: [
      "imageには、NFTの画像のURLを入力してね。",
      "ここは、再度一括で設定できる画面があるから、後から設定することをお勧めするよ。",
    ],
  },
  {
    target: "animation_url",
    comment: [
      "animation_urlには、 GLTF、GLB、WEBM、MP4、M4V、OGVなどのマルチメディアのURLを入力してね。",
      "ここは、再度一括で設定できる画面があるから、後から設定することをお勧めするよ。",
    ],
  },
  {
    target: "external_url",
    comment: [
      "external_urlには、OpenSeaにおける画像の下に外部のURLを表示したいときに、URLを入力してね。",
    ],
  },
  {
    target: "youtube_url",
    comment: "youtube_urlには、YouTube 動画への URLを入力してね。",
  },
  {
    target: "/intricate",
    comment: [
      "複雑なジェネラティブをするときに使うよ。一般的なジェネラティブを行いたい場合は、Designを使ってね。",
      "まずは、パーツデータを読み込もう！",
    ],
  },
  {
    target: "/intricate/settingFolder",
    comment: [
      "ここでは、メインパーツ、オプションパーツ、背景を分類していくよ。",
      "背景は、必ず一つ選択してね",
    ],
  },
  {
    target: "/intricate/mainConfig",
    comment: [
      "ここでは、メインパーツの設定を行なっていくよ。",
      "メインパーツの設定については、「intricate」の説明をよく読んでね",
    ],
  },
  {
    target: "/intricate/optionConfig/Total",
    comment: [
      "ここでは、オプションパーツの設定を行なっていくよ。",
      "オプションパーツの設定については、「intricate」の説明をよく読んでね",
    ],
  },
  {
    target: "/intricate/sortConfig",
    comment: [
      "ここでは、パーツの並び替えができるよ。サンプル機能を活用しながら並び替えてね",
    ],
  },
  {
    target: "/intricate/renameConfig",
    comment: [
      "ここでは、メタデータに書き込むプロパティの名称や名前を変更できるよ。",
      "後から変更することも可能だよ。",
    ],
  },
  {
    target: "/prep",
    comment: [
      "ここでは、メタデータに書き込む情報を入力しよう！",
      "後から個別でメタデータを編集したり、エクセルに出力して編集することもできるよ。",
    ],
  },
  {
    target: "prepNextButton",
    comment: [
      "メタデータに書き込むデータの設定が終わったら、次へを押してね。",
      "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
    ],
  },
  {
    target: "/blueprint",
    comment: [
      "ここでは、画像合成や画像選定、メタデータの修正を行なっていくよ。",
      "一括でメタデータを修正したい場合は、Convert機能を使ってみてね。",
    ],
  },
  {
    target: "noBlueprintDatas",
    comment: "まだジェネラティブが出来てないよ",
  },
  {
    target: "blueprintReload",
    comment: "データをリロードするよ。",
  },
  {
    target: "blueprintNext",
    comment: [
      "画像合成や画像選定、メタデータの修正が終わったら、次へを押してね。",
      "次へを押すと、ここで設定したデータが保存されて、次のステップに進むよ。",
    ],
  },
  {
    target: "/convert",
    comment: "ここでは、メタデータの情報を一括変換できるよ。",
  },
  {
    target: "convert_key",
    comment: "一括変換したいプロパティの名前を書いてね。",
  },
  {
    target: "convert_value",
    comment: "一括変換後の値を書いてね。",
  },
  {
    target: "convert_link",
    comment: "一括変換をする際に、リンクさせるプロパティを選択してね。",
  },
  {
    target: "convert_symbol",
    comment: [
      "一括変換をする際に、リンクさせる独自の記号を書いてね。",
      "例えば、##idを独自の記号に設定して、変更後の値の中に##idを埋め込むと、その部分が選択したプロパティに変換されるよ。",
    ],
  },
  {
    target: "/export",
    comment: "ここでは、NFTにするために必要なデータの整理を行っていくよ。",
  },
  {
    target: "/other",
    comment: [
      "ここでは、 データを取り出したり、データを取り込むことができるよ。",
      "今編集しているプロジェクトに上書きすることになるから注意してね。",
    ],
  },
  {
    target: "addOptionFunc",
    comment: [
      "再度ジェネラティブを行い、追加したいデータ数に応じてランダムに抽出します。",
      "同じ組み合わせが発生しないようにチェックをかけているため必ず追加されるデータの量が減る可能性があります。",
    ],
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
  {
    target: "",
    comment: "",
  },
];

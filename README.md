<p align="center">
<img src="https://raw.githubusercontent.com/akashic-games/akashic-engine-standalone-release-action/main/img/akashic.png"/>
</p>

# akashic-engine-standalone-release-action

Akashic Engine を単体 HTML ファイルで実行するためのスクリプト生成モジュールです。

## 利用方法

リリースページから任意のバージョンの `zip` をダウンロードしてください。
圧縮ファイルには `akashic-engine-standalone-x.y.z.js` と `akashic-engine-standalone-x.y.z.min.js` が格納されています。
(`.min` は圧縮版となっています。)

HTML の任意の箇所で `akashic-engine-standalone-x.y.z.js` または `akashic-engine-standalone-x.y.z.min.js` を読み込むと、グローバル変数 `AE` を参照することが可能になります。

`AE.initialize()` によりゲームを実行します。

```javascript
/**
 * ゲームの初期化をします。
 * 戻り値を実行するとゲームを破棄します。
 */
var finalize = AE.initialize({
  /**
   * HTMLCanvasElement を指定します。
   */
  canvas: document.getElementById("canvas"),
  /**
   * ゲームの設定を指定します。
   * 大部分は game.json と共通しています。
   */
  configuration: {
    /**
     * ゲームのFPS。
     * 省略時は 30 。
     */
    fps: 60,
    /**
     * ゲームキャンバスの横幅。
     * この値を変更すると HTMLCanvasElement 自体のサイズが変更されます。
     * 省略した場合は HTMLCanvasElement の横幅となります。
     */
    width: 800,
    /**
     * ゲームキャンバスの縦幅。
     * この値を変更すると HTMLCanvasElement 自体のサイズが変更されます。
     * 省略した場合は HTMLCanvasElement の縦幅となります。
     */
    height: 450,
    /**
     * アセット情報。
     * 対象のアセットはゲームの実行環境から同一オリジンでアクセスできる場所である必要があります。
     */
    assets: {
      aco: {
        type: "image",
        path: "./images/aco.png",
        width: 128,
        height: 288
      },
      se: {
        type: "audio",
        path: "./audios/se",
        systemId: "sound",
        duration: 250
      }
    }
  },
  mainFunc: function(g, args) {
    // ゲームのメインロジックを記述します。
  }
});
```

### HTML ファイル例

[こちらのディレクトリ](./dist) にサンプルが置いてあります。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>sample game</title>
</head>
<body>
  <canvas id="canvas" width="800" height="450"></canvas>
  <script src="./dist/akashic-engine-standalone-3.0.0-beta.31.js"></script>
  <script>
    AE.initialize({
      canvas: document.getElementById("canvas"),
      configuration: {
        fps: 60,
        assets: {
          aco: {
            type: "image",
            path: "./images/aco.png",
            width: 128,
            height: 288
          }
        }
      },
      mainFunc: function(g, args) {
        var scene = new g.Scene({
          game: g.game,
          assetIds: ["aco"]
        });
        scene.onLoad.addOnce(function() {
          var aco = new g.FrameSprite({
            scene: scene,
            src: scene.asset.getImageById("aco"),
            width: 32,
            height: 48,
            interval: 200,
            frames: [0, 1, 2, 3]
          });
          aco.start();
          scene.append(aco);
        });
        g.game.pushScene(scene);
      }
    });
  </script>
</body>
</html>
```

### 外部ライブラリの利用

以下の外部ライブラリを利用することができます。

* [akashic-timeline](https://github.com/akashic-games/akashic-timeline)
* [akashic-label](https://github.com/akashic-games/akashic-label)
* [akashic-box2d](https://github.com/akashic-games/akashic-box2d)

それぞれのライブラリを利用する際は、あらかじめスクリプトを読み込んでおく必要があります。

以下は akashic-timeline の例です。

```html
<body>
  <script src="./dist/akashic-engine-standalone-3.0.0-beta.31.js"></script>
  <script src="./dist/akashic-timeline-3.0.0-beta.2"></script>
  <script>
    ...
    mainFunc: function(g) {
      var tl = require("@akashic-extension/akashic-timeline");
      // ...
    }
```

その他のライブラリの利用例については [こちらのディレクトリ](./dist/samples) にあります。

## ビルド方法

akashic-engine-standalone-release-action は TypeScript で書かれています。ビルドには Node.js が必要です。
リポジトリ直下で次を実行してください。

```
npm install
npm run build
```

ビルドすると `./dist` ディレクトリに`akashic-engine-standalone-x.y.z.js` と `akashic-engine-standalone-x.y.z.min.js` が生成されます。

## テスト方法

```
npm test
```

## リリース

以下のコマンドを実行します。

```sh
npm run deploy
```

リリースは GitHub Actions で自動的に実行されます。
通常のリリースの場合、`npm run deploy` を手動で実行する必要はありません。

## リリースフロー

* akashic-engine が更新され、新しいバージョンが publish される
* `Update internal modules` workflow が1日1回呼び出され、 akashic-engine のバージョンを確認する
  * 更新があれば、これを取り込んだ PR を作成する
* PR が main ブランチにマージされると、`Push Release Tag` workflow が新しいタグを最新コミットに付ける
* 新しいタグが付くと、 `Release and Upload Assets` workflow がリリースを作成する

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](./LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。

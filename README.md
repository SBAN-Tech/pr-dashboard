# PremiereRush Dashboard

プレミアラッシュのダッシュボード(すべあな界隈での大規模プレミアラッシュを想定)

# How to use

## Setup Database

Firebase CondoleからFirebaseプロジェクトを作成し、さらにその中にあるFirestoreを有効化、そして**contents**という名前のコレクションを作成してください。

次に、`[設定アイコン] > プロジェクトの設定 > マイアプリ`でWebアプリを追加し、表示されたJavaScriptオブジェクトの値を`.env.local`(書き方は[こちら](docs/config.md))に書き込んでください(`.env.example`に雛形が載っています)。

## Setup Dashboard

以下のファイルをプレミアラッシュの詳細通りに変更してください。

- `src/config.toml` ...ダッシュボードの設定 (書き方は[こちら](docs/config.md))
- `src/markdowns/{rule, howto}.md` ...ルール・参加方法ページの内容

また、`static`ディレクトリは画像ファイルなどを入れるディレクトリです。必要に応じてファイルを入れてください。

## Publish

任意のJamstackホスティングサービスで公開しましょう。

# Future Features

- 管理画面
- YouTubeプレイリスト追加

# Donation

するな

# Contribution

手伝ってください。

すべあな界隈技術部に入りたい方は[仮設参加申請フォーム](https://forms.gle/8HRm74boxdpkfWRp6)へお願いします。

# License

MIT Licenseで公開しています。

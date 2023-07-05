# PremiereRush Dashboard
プレミアラッシュのダッシュボード(すべあな界隈での大規模プレミアラッシュを想定)

# How to use
## Setup Database
Firebase CondoleからFirebaseプロジェクトを作成し、さらにその中にあるFirestoreを有効化、そして**contents**という名前のコレクションを作成してください。

次に、`[設定アイコン] > プロジェクトの設定 > マイアプリ`でWebアプリを追加し、表示されたJavaScriptオブジェクトの値を`.env.local`に書き込んでください(`.env.example`に例が載っています)。

## Setup Dashboard
以下のファイルをプレミアラッシュの詳細通りに変更してください。
- `src/config.toml` ...ダッシュボードの設定
- `src/routes/{rule, howto, enjoy}/+page.svelte` ...ルール・参加方法・楽しみ方ページの内容

また、`static`ディレクトリは画像ファイルなどを入れるディレクトリです。必要に応じてファイルを入れてください。

## Publish
任意のJamstackホスティングサービスで公開しましょう。

# Future Features
- Markdownでルール・参加方法・楽しみ方ページの内容を記述
- 管理画面
- YouTubeプレイリスト追加

# Donation
するな

# Contribution
手伝ってください。

<small style="opacity: 0.5;">すべあな界隈技術部に入りたい方は[仮設参加申請フォーム](https://forms.gle/8HRm74boxdpkfWRp6)へお願いします。</small>

# License
MIT Licenseで公開しています。
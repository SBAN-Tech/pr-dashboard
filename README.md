# PremiereRush Dashboard
プレミアラッシュのダッシュボード(すべあな界隈での大規模プレミアラッシュを想定)

## Setup
便宜上プロジェクト名を`prname`にしときます

必要なもの
- bun
- openssl

### 0. Environment
```sh
git clone https://github.com/SBAN-Tech/PR-Dashboard.git prname
cd prname
bun i
```

### 1. Database
```sh
bunx wrangler login
bunx wrangler d1 create prname
```
このとき表示された`database_name`と`database_id`を`wrangler.toml`の`[[d1_databases]]`のとこに書いときましょう

```sh
bunx wrangler d1 execute prname --remote --file migrations/0000_ancient_gwen_stacy.sql
```

### 2. Authentication
[Discord Developer Portal](https://discord.com/developers/applications)を開き、アプリケーションを作成または既存のアプリケーションを開いてください

OAuth2画面にあるCLIENT ID, CLIENT SECRETをそれぞれ`wrangler.toml`の`[vars]`の`AUTH_DISCORD_ID`, `AUTH_DISCORD_SECRET`に書いときましょう

また、同ページのRedirectsに`[サイトのURL]/auth/callback/discord`を追加してください

`wrangler.toml`の`[vars]`の`AUTH_DISCORD_USERS`には管理ダッシュボードにログインできる人のDiscord ID(開発者モード(詳細設定でONにできる)でその人のプロフィールを開く→その他→ユーザーIDをコピー)を**文字列で**書いときましょう

そして
```sh
openssl rand -base64 32
```
で表示された32文字の文字列を`wrangler.toml`の`[vars]`の`AUTH_SECRET`に書いときましょう

### 3. Dashboard
`src/config.toml`を開き、以下を参考に編集してください

(Root)
|Key|Type|Description|
|---|---|---|
|`title`|`string`|プレラ名|
|`tagline`|`string`|キャッチコピー|
|`description`|`Markdown`|詳細|
|`hashtag`|`string`|ハッシュタグ|
|`list`|`string?`|再生リスト|
|`favicon`|`string`|ファビコンのURL (`static/`内はルートとして扱う)|
|`logo`|`string`|ロゴのURL|
|`logo_polyfill`|`string`|ロゴが読み込めないときの代替ロゴ(PNGが望ましい)のURL|
|`copyrights`|`Array<string>`|コピーライト|
|`start`|`ISO8601`|開始日時(0:00が望ましい)|
|`limit`|`ISO8601`|登録締切|
|`end`|`ISO8601`|終了日時(23:59が望ましい)|
|`timezone`|`string`|使用するタイムゾーン<br>[Time Zone Database](https://www.iana.org/time-zones)を参照|
|`playlidId`|`string`|再生リストのID|

[category]
|Key|Type|Description|
|---|---|---|
|`list`|`Array<string>`|カテゴリーのリスト|
|`event`|`string?`|↑の中のイベントにあたるカテゴリー|

`wrangler.toml`の`[vars]`の`DISCORD_WEBHOOK_URL`はDiscordのタイムテーブル通知botのWebhookのURLです 必要ないなら空にするか行を抹消してください

### 4. Deploy
先に`wrangler.toml`の`name`(プロジェクト名)を変えときましょう

変えたら
```sh
bun run deploy
```

を実行すればできているはずです。

カスタムURLを登録するときは[https://dash.cloudflare.com](https://dash.cloudflare.com)から登録することを忘れずに! (Discord認証で問題が発生する)

## Donation
するな

## Contribution
手伝ってください

すべあな界隈技術部に入りたい方は[仮設参加申請フォーム](https://forms.gle/8HRm74boxdpkfWRp6)へお願いします

## License
基本はMIT Licenseで公開しています

[Cantarell](https://cantarell.gnome.org) (`static/Cantarell-VF.woff2`)についてはSIL Open Font Licenseのもとで公開されています

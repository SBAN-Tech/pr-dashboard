# 設定ファイルの書き方

PR-Dashboardは`src/config.toml`と`.env`に設定を記述します。

## `config.toml`

TOML形式のファイルです。

TOMLの書き方については[こちら](https://toml.io/ja/)を参考にしてください。

?のついているものは記述なしでも可となっています。

[]のついているものは配列です。

| 変数名             | 型         | 説明                                                         |
| --------------- | --------- | ---------------------------------------------------------- |
| `title`         | 文字列       | プレラ名                                                       |
| `tagline`       | 文字列       | キャッチコピー                                                    |
| `description`   | 文字列       | 詳細<br>Markdownは段落とインラインのみ可                                 |
| `hashtag`       | 文字列       | ハッシュタグ                                                     |
| `list`          | 文字列?      | 再生リストのID<br>(`https://www.youtube.com/playlist?list=[ここ]`) |
| `favicon`       | 文字列       | サイトアイコンのURL<br>(`static`内のファイルは`/`の下に入ります)                 |
| `logo`          | 文字列       | ロゴ画像のURL                                                   |
| `logo_polyfill` | 文字列?      | ロゴ画像が読み込めなかった場合の代替ロゴ画像のURL                                 |
| `copyrights`    | 文字列[]     | コピーライト                                                     |
| `categories`    | 文字列[]     | 動画のカテゴリー                                                   |
| `theme`         | 文字列       | テーマ(後述)                                                    |
| `start`         | オフセット付き日時 | プレラの開始日時(時刻は目安)                                            |
| `limit`         | オフセット付き日時 | 登録締切の日時                                                    |
| `end`           | オフセット付き日時 | プレラの終了日時(時刻は目安)                                            |
| `timezone`      | 文字列       | タイムゾーン<br>(例: 日本標準時は`Asia/Tokyo`)                          |
| `discord`       | 文字列?      | DiscordのWebhook URL<br>(ある場合はDiscordに通知が来ます)               |

### テーマについて

テーマは以下の通りです。



- slate

- gray

- zinc

- neutral

- stone

- red

- orange

- amber

- yellow

- lime

- green

- emerald

- teal

- cyan

- sky

- blue

- indigo

- violet

- purple

- fuchsia

- pink

- rose

色の詳細については[こちら](https://tailwindcss.com/docs/customizing-colors)を見てください。

## `.env`

FirebaseのAPI Key等はこちらで書きます。

`env.example`に雛形があります。

```dotenv
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STRAGE_BUCKET=""
VITE_FIREBASE_MASSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
```

以下のように対応させてください。

| `.env`                              | 元のもの                |
| ----------------------------------- | ------------------- |
| `VITE_FIREBASE_API_KEY`             | `apiKey`            |
| `VITE_FIREBASE_AUTH_DOMAIN`         | `authDomain`        |
| `VITE_FIREBASE_PROJECT_ID`          | `projectId`         |
| `VITE_FIREBASE_STRAGE_BUCKET`       | `storageBucket`     |
| `VITE_FIREBASE_MASSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID`              | `appId`             |
| `VITE_FIREBASE_MEASUREMENT_ID`      | `measurementId`     |

# network-viewer

Network Viewer はmacOSのメニューバーに端末のネットワーク等の情報を表示し、トラブルシューティング等を行う際に作業をサポートするツールです。

Electron アプリとして制作しました。

## Requirement

### 確認済みの環境:

- OS: macOS
- Node.js version: v18.12.0
- npm version: 8.19.x

## Install && Usage

```
$ git clone https://github.com/yu1k/network-viewer.git network-viewer && cd $_
$ npm install && npm run build
```

GitHubからcloneしてElectronアプリをビルドします。

ビルドが終わったあとは、network-viewerディレクトリ直下の ./dist/ ディレクトリの下に生成された .dmg ファイルを展開します。

### BSSID を取得したい場合

端末のWi-Fi情報を取得するためにこのアプリではmacOS標準搭載のairportというツールを利用しています。

airportでBSSIDを取得したい場合はスーパーユーザの権限が必要になるので、Electronアプリを実行するユーザのパスワード(macOSにログインする際に使用しているパスワード)を NETWORK_VIEWER_PASSWORD という環境変数に格納します。

```
$ export NETWORK_VIEWER_PASSWORD='ユーザのパスワード'
```

Network Viewerをアンインストールした際、またはBSSIDの取得が必要なくなった際は、下記コマンドを実行し、設定時に設定した環境変数を削除してください。

```
$ unset NETWORK_VIEWER_PASSWORD
```

BSSIDの取得が必要でないならば上記の手順は必要ありません。

## TODO

- [ ] グローバルIPアドレスの取得

## Thanks

グローバルIPアドレスの取得に [ipinfo.io](https://ipinfo.io/) を使用しています。

## License

[./assets/](./assets/) , [./icons.iconset](./icons.iconset) ディレクトリ以下に格納されている画像は [yu1k](https://github.com/yu1k/) がメモ帳に手書きで描いて作成した画像です。
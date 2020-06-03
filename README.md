# websocket-local-camera
## 概要
- スマホをLAN内でアクセス可能な遠隔カメラ化
- 現状、Androidでのみ動作
## 使い方
- セットアップ
```
# https化する準備
$ brew install mkcert
$ mkcert -install
# IPアドレス確認
$ ifconfig | grep -E 'inet\s192\.168\.\d*\.\d*\s'
# オレオレ証明書発行
$ mkcert [YOUR_IP_ADDRESS]
```
- [YOUR_IP_ADDRESS].pemと[YOUR_IP_ADDRESS]-key.pemが吐き出される
- websocket-local-camera.pem/websocket-local-camera-key.pemにリネーム
- nginx/cert-key/以下に2つとも配置
- 実行
```
$ docker-compose up
```
## 参考
- https://qiita.com/lovesaemi/items/17c5f27cd8f5110337a6
## メモ
- [local開発環境でhttpsの動作検証時にlocal-web-serverとmkcertが便利](http://aligach.net/diary/20190330.html)
```
HTML5 の JavaScript API は、以前はいつでも利用できたが、
最近ではプライバシーの観点から https 接続を必須にする方向に変わってきている。
ただし、localhost は特別扱いしてくれるため http でも利用できる。
したがってサーバを動かしている PC 上ではいつでも API を利用することができるので、
PC 上では動作、デバッグが可能である。
しかしモバイルデバイスでこれらの API を利用する場合、
モバイルデバイス上では開発サーバが動いていないので、
モバイルデバイスからは localhost でアクセスすることができない。
つまり、モバイルデバイス実機でのAPIの利用のためには開発サーバがhttpsを喋っている必要がある。
```
## なんでWebSocketってNAT超えられるの？
HTTPでは任意タイミングで任意データをサーバ→クライアント方向に流すことができない。
なので、前提としてWebSocketではクライアント同士は無理。NAT超えられない。
グローバルIP持ってるサーバーとならコネクションを張れるので、まずはクライアント起点で
サーバーにhttpリクエスト送る(クライアント同士だと、この初回のリクエストの時点で無理)。
そこでWebSocketコネクション張れたら、以降はサーバー起点からでもデータ流せるようになる。
これがWebSocket。
クライアント同士でリアルタイム通信したければ、
[クライアントA]-[サーバー]間と[クライアントB]-[サーバー]間にコネクションを張り、
サーバーを介して実施するトポロジーになる。
## mkcertの仕組み(自己流理解なので間違ってる可能性アリ)
認証局の公開鍵はビルトインでブラウザ(ルート証明書)とかMacの中に入っている。
認証局の署名入りのサーバーの証明書受け取ったら、ビルトインで持ってる認証局の公開鍵で復号。
「認証局の署名」=「認証局の秘密鍵で暗号化したもの」なので、復号できれば正しい証明書だとわかる。
つまり認証されてるお墨付きが得られる。
mkcertはそのビルトインの部分に無理やり自前の公開鍵をぶち込む方法。
んで、後はnginxのssl_certificateに鍵設定してやればOK。

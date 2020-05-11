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
- http://aligach.net/diary/20190330.html
```
HTML5 の JavaScript API は、以前はいつでも利用できたが、最近ではプライバシーの観点から https 接続を必須にする方向に変わってきている。ただし、localhost は特別扱いしてくれるため http でも利用できる。したがってサーバを動かしている PC 上ではいつでも API を利用することができるので、PC 上では動作、デバッグが可能である。
しかしモバイルデバイスでこれらの API を利用する場合、モバイルデバイス上では開発サーバが動いていないので、モバイルデバイスからは localhost でアクセスすることができない。つまり、モバイルデバイス実機での API の利用のためには開発サーバが https を喋っている必要がある。
```
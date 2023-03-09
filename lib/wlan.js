"use strict";

const { execSync } = require("child_process");

// 各種コマンド
const airportCommand = "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport";
const sedCommand = "/usr/bin/sed";
const awkCommand = "/usr/bin/awk";
const sudoCommand = "/usr/bin/sudo";

/**
 * 端末の無線LAN接続情報を取得する関数
 */
function getWlanInfo(ssidOrBissid){
    let wlanSsidInfo = null;
    let wlanBssidInfo = null;

    /**
     * SSID, BSSIDの情報はオブジェクトの形式にする
     * SSID情報: `wlanSsidInfoToObj.ssid`
     * BSSID情報: `wlanSsidInfoToObj.bssid`
     * { ssid: 'hoge', bssid: 'piyo' }
     */
    let wlanSsidInfoToObj = new Object();

    /**
     * process.env.NETWORK_VIEWER_PASSWORD: スーパーユーザで実行したいので環境変数から取得して利用する
     * sed: SSID にマッチした行を抽出, 先頭に空白が入っているのはBSSIDまで抽出してしまうため
     * awk: 2フィールド目を出力
     */
    try {
        // 環境変数 NETWORK_VIEWER_PASSWORD がsetされていたらBSSIDを取得する
        if(process.env.NETWORK_VIEWER_PASSWORD){
            wlanSsidInfo = execSync(`${airportCommand} -I | ${sedCommand} -ne '/ SSID:/p' | ${awkCommand} '{print $2}'`);
            wlanBssidInfo = execSync(`echo ${process.env.NETWORK_VIEWER_PASSWORD} | ${sudoCommand} -S ${airportCommand} -I | ${sedCommand} -ne '/BSSID:/p' | ${awkCommand} '{print $2}'`);
            wlanSsidInfoToObj.ssid = (wlanSsidInfo.toString()).replace(/\n/g, '');
            wlanSsidInfoToObj.bssid = (wlanBssidInfo.toString()).replace(/\n/g, '');
            return wlanSsidInfoToObj;
        }
        wlanSsidInfo = execSync(`${airportCommand} -I | ${sedCommand} -ne '/ SSID:/p' | ${awkCommand} '{print $2}'`);
        wlanSsidInfoToObj.ssid = (wlanSsidInfo.toString()).replace(/\n/g, '');
        wlanSsidInfoToObj.bssid = null;
        return wlanSsidInfoToObj;
    } catch (err) {
        console.error("予期しないエラーが発生しました。" + "\n" + "エラーメッセージ: " + err);
    }
}

console.log(getWlanInfo());

module.exports = {
    getWlanInfo
}
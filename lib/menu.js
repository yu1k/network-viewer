"use strict";

const { app, Menu, MenuItem, Tray } = require("electron");
const path = require("path");

const wlan = require("./wlan");

/**
 * Tray のタイトルについてsetとupdateをする関数
 * この関数が最初に実行された際は、Trayのタイトルを設定する。すでに実行された後に再度実行されるとTrayのタイトルを最新の状態に更新する。
 */
// Trayを格納する変数
let tray = null;
function updateTrayTitle(){
    // デバッグ用
    console.log("SSID: "+((wlan.getWlanInfo()).ssid) + "  " + "BSSID: " + ((wlan.getWlanInfo()).bssid));

    // (wlan.getWlanInfo()).bssid の返り値がnullの場合はメニューバーには表示しない。
    let bssidTemp = ((wlan.getWlanInfo()).bssid !== null) ? ("  BSSID: " + (wlan.getWlanInfo()).bssid) : "";

    // デバッグ用
    // return tray.setTitle("pyonpyon"+"\n"+"piyopiyo");

    return tray.setTitle("SSID: " + (wlan.getWlanInfo()).ssid + "" + bssidTemp);
}

/**
 * Tray ICON 生成
 */
function trayIconGenerate(ssidTitle, bssidTitle){
}

/**
 * メニューアイテムを作成する関数
 */
// メニューを格納する変数
let menu = null;
function createManuItem(){

    // メニューに動的に変更したい
    // let menuItemArray = new MenuItem();

    // 新しいメニューを作成する
    menu = new Menu();
    menu.append(new MenuItem({ label: "状態を更新する", click: () => { updateTrayTitle } }));
    menu.append(new MenuItem({ type: 'separator' }));

    menu.append(new MenuItem({ label: `SSID: ${(wlan.getWlanInfo()).ssid}` }));

    // (wlan.getWlanInfo()).bssid の返り値がnullの場合はメニューバーには表示しない。
    if((wlan.getWlanInfo()).bssid !== null){
        menu.append(new MenuItem({ label: `${("BSSID: " + (wlan.getWlanInfo()).bssid)}` }));
    }
    menu.append(new MenuItem({ label: `${("Channel: " + (wlan.getWlanInfo()).channel)}` }));
    menu.append(new MenuItem({ label: `${("Channel BandWidth: " + (wlan.getWlanInfo()).channelBandwidth)} MHz` }));
    menu.append(new MenuItem({ label: `${("Linkrate : " + (wlan.getWlanInfo()).linkrate)} Mbps` }));
    menu.append(new MenuItem({ label: `${("RSSI : " + (wlan.getWlanInfo()).rssi)} dBm` }));

    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: "Network Viewer を終了", role: "quit" }));

    tray.setContextMenu(menu);

    return menu;
}

/**
 * メニューバーのTrayアイテム、メニューアイテム等を更新する関数
 */
function updateMenuItem(){
    updateTrayTitle();
    createManuItem();
}

// メニューバーのアイコン: ${__dirname}../assets/wlan_logo_24x24.jpg
//const backgroundIcon = path.join(__dirname, "../assets/aaaa.png");
const backgroundIcon = path.join(__dirname, "../assets/wlan_logo_18×18.jpg");

/**
 * メニューバーにおいて、テンプレートを作成する関数。
 * Electronアプリを初回実行したあとは、変動しない情報の処理をこの関数に記述する。1回だけ実行する。
 */
function initializeMenu(){
    // backgroundIcon を利用して tray アイコンを作成する
    tray = new Tray(backgroundIcon);
    return tray;
}

module.exports = {
    updateMenuItem,
    initializeMenu
};
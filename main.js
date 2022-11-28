"use strict";

const { app, BrowserWindow } = require("electron");
const path = require("path");

// ウィンドウ管理用
let win = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js")
        }
    });

    win.loadFile(path.join(__dirname, "./index.html"));
}

/**
 * Electronが終了した際に呼び出される
 * 初期化され、再度ウィンドウを生成するための処理
 * 一部のAPIは、このイベントが発生した後にのみ使用できる
 */
app.whenReady().then(() => {
    createWindow();
    console.log("start: ");

    // 開いたウインドウがない場合にウインドウを開く (macOS)
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

/**
 * macOS以外ではすべてのウィンドウが閉じられたらアプリを終了させる
 * 他のOSに対応させた際に必要になる
 */
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
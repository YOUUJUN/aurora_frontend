"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

import {
    startDevBuffCrawler,
    startPrdBuffCrawler,
    getBuffCrawlerLog,
    stopBuffCrawler,
    restartBuffCrawler,
    showNotification,
    test
} from "./MainProcess/services";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        frame: true,
        width: 1280,
        height: 800,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false,
            // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }

    //ipcMain listener

    ipcMain.on("minimize", () => {
        win.minimize();
    });

    ipcMain.on("maximize", () => {
        if (win.isMaximized()) {
            win.unmaximize();
            win.center();
        } else {
            win.maximize();
        }
    });

    ipcMain.on("closeWindow", () => {
        win.close();
    });



    /*---buffCrawler---*/
    ipcMain.on("startDevBuffCrawler", () => {
        console.log("let us start buff crawler dev");
        startDevBuffCrawler().then((res) => {
            win.webContents.send("buffCrawlerRunning", res);
        }).catch(err => {
            win.webContents.send("startBuffCrawlerFailed", err);
        }).finally(() =>{
            win.webContents.send("startBuffCrawlerDone");
        });
    });

    ipcMain.on("startPrdBuffCrawler", () => {
        console.log("let us start buff crawler prd");
        startPrdBuffCrawler().then((res) => {
            win.webContents.send("buffCrawlerRunning", res);
        }).catch(err => {
            win.webContents.send("startBuffCrawlerFailed", err);
        }).finally(() =>{
            win.webContents.send("startBuffCrawlerDone");
        });
    });

    ipcMain.on("stopBuffCrawler", () => {
        console.log("let us stop buff crawler");
        stopBuffCrawler().then((res) => {
            win.webContents.send("buffCrawlerClosing", res);
        }).catch(err => {
            win.webContents.send("stopBuffCrawlerFailed", err);
        }).finally(() =>{
            win.webContents.send("stopBuffCrawlerDone");
        });
    });

    ipcMain.on("reStartBuffCrawler", () => {
        console.log("let us restart buff crawler");
        restartBuffCrawler().then((res) => {
            win.webContents.send("buffCrawlerRunning", res);
        }).catch(err => {
            win.webContents.send("startBuffCrawlerFailed", err);
        }).finally(() =>{
            win.webContents.send("startBuffCrawlerDone");
        });
    });

    ipcMain.on("getBuffCrawlerLog", () => {
        console.log("let us get buff logs    ");
        getBuffCrawlerLog();
    });

    ipcMain.on("notifyLoopEnd", () => {
        
        showNotification({
            title : `通知！！！`,
            body : `本次循环任务已经完成！`,
            timeoutType : 'never'
        })
    })

    ipcMain.on('test', () => {
        test();
    });

}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // try {
        //   await installExtension(VUEJS3_DEVTOOLS)
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

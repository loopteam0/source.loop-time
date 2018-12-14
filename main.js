//@ts-check
const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

const ipc = electron.ipcMain;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
const shortcut = electron.globalShortcut;
const homeDir = os.homedir();
const downloadDir = `${app.getPath('downloads')}\\LoopClient\\`;
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 650,
        show: false,
        minWidth: 960,
        darkTheme: false,
        icon: path.join(__dirname, '/src/assets/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            scrollBounce: true, 
        }
    })

    //      win.loadURL(url.format({
    //     pathname: path.join(__dirname, '/dist/ngapp3/index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }));

    win.loadURL(`http://localhost:4200`);
  
    // Event when the window is closed.
    win.on('closed', () => {
        win = null
    })

    win.once('ready-to-show', () => {
        win.show()
    });
}


app.on('window-all-closed', () => {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})


app.on('will-quit', ()=> {
    shortcut.unregisterAll()
})

// Handle all downloads
function downloadHandler() {
    win.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.

    let fileName = `[LOOP] ${item.getFilename()}`;
    const downloadPath = `${downloadDir}\\${fileName}`;
    item.setSavePath(downloadPath)

    item.on('updated', (event, state) => {
        if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
        if (item.isPaused()) {
            console.log('Download is paused')
        } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
        }
    })
    item.once('done', (event, state) => {
        if (state === 'completed') {
        console.log('Download successfully');
        shell.beep();
        shell.openExternal(downloadPath);
        } else {
        console.log(`Download failed: ${state}`)
        }
    })
    })

}

function reloadWindow() {
    app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
    app.exit(0)
}

function openDownloadPath(){
    shell.openExternal(downloadDir)
}

// when app is ready
app.on('ready', () => {
    // create window
    createWindow();
    // load menu
    Menu.setApplicationMenu(null);

    // register shortcuts
    shortcut.register('CommandOrControl+Shift+L+P', () => {
        win.webContents.openDevTools();
    })
    shortcut.register('CommandOrControl+L', () => {
        openDownloadPath();
    })

    // load contex-menu
    const menu = new Menu()
    menu.append(new MenuItem({
        role: 'cut',
    }))
    menu.append(new MenuItem({
        role: 'copy',
    }))
    menu.append(new MenuItem({
        role: 'paste',
        accelerator: '',
    }))
    menu.append(new MenuItem({
        role: 'selectall'
    }))
    menu.append(new MenuItem({
        type: 'separator'
    }))
    menu.append(new MenuItem({
        label: 'Reload',
        click: reloadWindow
    }))
    menu.append(new MenuItem({
        label: 'Open Download Location',
        click: openDownloadPath
    }))
    menu.append(new MenuItem({
        type: 'separator'
    }))
    menu.append(new MenuItem({
        label: 'Exit',
        role: 'close'
    }))
    win.webContents.on('context-menu', function (e, params) {
        // @ts-ignore
        menu.popup(win, params.x, params.y)
    })

    // handle downloads
    downloadHandler();
})

// // update app handler
// try {
//     require('update-electron-app')({
//         repo: 'https://github.com/loopteam0/loop-Time',
//         // onecheck for updates weeek
//         updateInterval: '168 hours',
//     });
// } catch (err) {
//     console.log(err)
// }


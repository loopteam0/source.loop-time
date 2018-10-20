/* const { app, BrowserWindow , Menu , MenuItem } = require('electron') */
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
const homeDir = os.homedir();
let win;

const notification = {
    title: 'Download completed successfully',
    body: 'click open open downloaded file',
    function: function openfile(path) {
        shell.openExternal(path)
    }
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 720,
        show: false,
        minWidth: 960,
        darkTheme: false,
        icon: path.join(__dirname, '/src/assets/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            scrollBounce: true,
            overlayFullscreenVideo: false
        }
    })

    //      win.loadURL(url.format({
    //     pathname: path.join(__dirname, '/dist/ngapp3/index.html'),
    //     protocol: 'file',
    //     slashes: true
    // }));

    win.loadURL(`http://localhost:4200`)
    //// uncomment below to open the DevTools.
    // win.webContents.openDevTools()
    // Event when the window is closed.
    win.on('closed', () => {
        win = null
    })

    win.once('ready-to-show', () => {
        win.show()
    });
}


function createSPlashScreen() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 400,
        height: 300,
        show: false,
        minWidth: 960,
        darkTheme: false,
        icon: path.join(__dirname, '/src/assets/icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            scrollBounce: true,
            overlayFullscreenVideo: false
        }
    })

         win.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/ngapp3/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.once('ready-to-show', () => {
        win.show()
    });
}

// Quit when all windows are closed.
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

// Handle all downloads
function downloadHandler() {
win.webContents.session.on('will-download', (event, item, webContents) => {
  // Set the save path, making Electron not to prompt a save dialog.
   // Set the save path, making Electron not to prompt a save dialog.
   let fileName = `[LOOP] ${item.getFilename()}`;
   const downloadPath = `${homeDir}\\Downloads\\LoopClient\\${fileName}`
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


function openDownloadLocation() {
    shell.openExternal(`${homeDir}\\Downloads\\LoopTime`)
}

function openFile(fileName) {
    if (Notification.isSupported()) {

    } else {

    }
}


// when app is ready
app.on('ready', () => {
    // create window
    createWindow();
    // load menu
    Menu.setApplicationMenu(null);

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
        label: 'rrel',
        click: BrowserWindow.reload
    }))
    menu.append(new MenuItem({
        role: 'reload'
    }))
    menu.append(new MenuItem({
        role: 'forcereload'
    }))
    menu.append(new MenuItem({
        label: 'Open Download Location',
        click: openDownloadLocation
    }))
    menu.append(new MenuItem({
        role: 'toggledevtools'
    }))
    menu.append(new MenuItem({
        type: 'separator'
    }))
    menu.append(new MenuItem({
        label: 'Exit',
        role: 'close'
    }))


    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })

    // handle downloads
    downloadHandler();



})

// update app handler
try {
    require('update-electron-app')({
        repo: 'https://github.com/loopteam0/loop-Time',
        // onecheck for updates weeek
        updateInterval: '168 hours',
    });
} catch (err) {
    console.log(err)
}


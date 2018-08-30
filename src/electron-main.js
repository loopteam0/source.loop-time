/* const { app, BrowserWindow , Menu , MenuItem } = require('electron') */
const electron = require("electron");
const path  = require('path');
const url = require('url');
const fs = require('fs');
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
let win;


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 720,
    show: false,
    minWidth: 900,
    backgroundColor: '#252525',
    icon: path.join(__dirname, '/src/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      darkTheme: true,
      webSecurity: false ,
      scrollBounce: true,
      overlayFullscreenVideo: false
    }
  })


  // win.loadURL(`file://${__dirname}/dist/LoopClient/index.html`)
  //   win.loadURL(`http://localhost:4200`)

    win.loadURL(`http://localhost:4200`)
    //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed',  () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  });
}

// Quit when all windows are closed.
app.on('window-all-closed',  () => {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate',  () => {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})

// Handle all downloads
 function downloadHandler(){
  win.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    let userPath = process.env.USERPROFILE;
    let downloadPath = `${userPath}\\Downloads\\LoopTime\\${item.getFilename()}`
    item.setSavePath(downloadPath)


    // onUpdated check for error
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
        item.setSavePath(item.getFilename())
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    // once download completes
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully');
        shell.beep();
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })
}




// when app is ready
app.on('ready', () => {
  // create window
  createWindow();
  // load menu
  Menu.setApplicationMenu(null);

  // load contex-menu
  const menu = new Menu()
  menu.append(new MenuItem({role: 'cut'}))
  menu.append(new MenuItem({role: 'copy'}))
  menu.append(new MenuItem({role: 'paste'}))
  menu.append(new MenuItem({role: 'selectall'}))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: 'reload', accelerator: 'CmdOrCtrl + R'}))
  menu.append(new MenuItem({ role: 'forcereload', accelerator: 'CmdOrCtrl + Shift + R'}))
  menu.append(new MenuItem({role: 'toggledevtools'}))
  menu.append(new MenuItem({ type: 'separator' }))
  ///menu.append(new MenuItem({role: 'about'}))
  menu.append(new MenuItem({label: 'Exit', role: 'close'}))


  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })

  downloadHandler();
  console.log(process.resourcesPath)

  })
 // In the main process.



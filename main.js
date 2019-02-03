//@ts-check
const electron = require('electron');
const path = require('path');
const url  = require('url');
const splashscreen = require("@trodi/electron-splashscreen");
const {autoUpdater} = require('electron-updater');

//const ipc = electron.ipcMain;
const shell = electron.shell;
//const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
const shortcut = electron.globalShortcut;
const downloadDir = `${app.getPath('downloads')}\\LoopClient\\`;
const rootPath = path.join(__dirname,'dist', 'app');
let splash;

// check for update at lunch time
function checkForUpdates(){

  try {
    autoUpdater.logger = require("electron-log")
    autoUpdater.checkForUpdatesAndNotify();
  } catch (error) {

  }


}

function check(){
  autoUpdater.checkForUpdates().then(
    res => console.log(res)
  ).catch(
    err => console.log(err)
  )
}

function createWindow() {
  // Browser window options
  const windowOptions = {
    width: 1024,
    height: 650,
    show: false,
    minWidth: 960,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      scrollBounce: true,
    }
  }
  // check platform and set icon🎇
  if (process.platform === 'win32') {
    windowOptions.icon = path.join(rootPath, '/assets/icons/icon.win.ico')
  } else if (process.platform === 'linux') {
    windowOptions.icon = path.join(rootPath, '/assets/icons/icon.png')
  }  else if (process.platform === 'darwin') {
    windowOptions.icon = path.join(rootPath, '/assets/icons/icon.png')
  }


  splash = splashscreen.initSplashScreen({
    windowOpts: windowOptions,
    templateUrl: path.join(rootPath, '/assets/splash/splash.gif'),
    delay: 0,
    minVisible: 1500,
    splashScreenOpts: {
      width: 500,
      height: 375,
      transparent: true,
      icon: path.join(rootPath, '/assets/icons/icon.png'),
      backgroundColor: '#ffffff',
      title: 'Loop Client Loading',
      zoomToPageWidth: false,
      movable: false,
      skipTaskbar: false,
      focusable: false,
      acceptFirstMouse : false

    }
  })

  splash.loadURL(url.format({
    pathname: path.join(rootPath, '/index.html'),
    protocol: 'file',
    slashes: true
  }));

 //splash.loadURL(`http://localhost:4200`);

  // Event when the window is closed.
  splash.on('closed', () => {
    splash = null
  })

  // When browser window is finished loading
  splash.once('ready-to-show', () => {
    splash.show()
  });

}


app.on('window-all-closed', () => {
  // On macOS specific close process
  app.quit();
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS specific close process
  if (splash === null) {
    createWindow()
  }
})


app.on('will-quit', () => {
  shortcut.unregisterAll()
})

//Handle all downloads
function downloadHandler() {
  splash.webContents.session.on('will-download', (event, item, webContents) => {
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
  app.relaunch({
    args: process.argv.slice(1).concat(['--relaunch'])
  })
  app.exit(0)
}

function openDownloadPath() {
  shell.openExternal(downloadDir)
}

// when app is ready
app.on('ready', () => {
  // create window
  createWindow();
  // load menu
  Menu.setApplicationMenu(null);

  // register shortcuts
  shortcut.register('CommandOrControl+Shift+T', () => {
    splash.webContents.openDevTools();
  })
  shortcut.register('CommandOrControl+D', () => {
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
  splash.webContents.on('context-menu', function (e, params) {
    // @ts-ignore
    menu.popup(splash, params.x, params.y)
  })

  // handle downloads
  downloadHandler();
  checkForUpdates();
 // check();

})





const autoUpdater = require('electron-updater')
const electron = require('electron')

const dialog = electron.dialog;


//   autoUpdater.on('checking-for-update', () => {
//     log('checking-for-update')
//   })

//   autoUpdater.on('update-available', () => {
//     log('update-available; downloading...')
//   })

//   autoUpdater.on('update-not-available', () => {
//     log('update-not-available')
//   })

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    log('update-downloaded', arguments)

    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })


  
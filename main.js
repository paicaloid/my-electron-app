const { BrowserWindow, app, Menu } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'development'
const isMac = process.platform === 'darwin'

// Create main window
function createMainWindow() {
  const mainWIndow = new BrowserWindow({
    title: 'Yeah!',
    width: isDev ? 1000 : 500,
    height: 800,
  })

  // Open DevTools in development mode
  if (isDev) {
    mainWIndow.webContents.openDevTools()
  }

  mainWIndow.loadFile(path.join(__dirname, './renderer/index.html'))
}

// App is ready
app.whenReady().then(() => {
  createMainWindow()

  // Implement menu
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// Menu template
const menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W',
      },
    ],
  },
]

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

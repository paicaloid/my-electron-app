const { BrowserWindow, app } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin';

function createMainWindow() {
  const mainWIndow = new BrowserWindow({
    title: 'Yeah!',
    width: 500,
    height: 600,
  });

  mainWIndow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
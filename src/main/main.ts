import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { setMainMenu } from './menu';

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow: BrowserWindow | null;

ipcMain.on('ping', event => {
  event.reply('pong', 'pong');
});

function createMainWindow() {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: isDevelopment
        ? path.join(__dirname, '../../dist/preload.js')
        : path.join(__dirname, 'preload.js'),
    },
  });
  window.setMenu(null);
  window.setMenuBarVisibility(false);

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:8080`);
  } else {
    window.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
  setMainMenu();
});

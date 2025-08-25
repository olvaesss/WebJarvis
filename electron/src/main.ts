import { app, BrowserWindow, Tray, Menu, Event } from 'electron';
import path from 'path';

let win: BrowserWindow | null = null;
let tray: Tray | null = null;
let isQuiting = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const isDev = !app.isPackaged;

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../../client-build/index.html')}`;

  win.loadURL(url);

  if (isDev) win.webContents.openDevTools();

  win.on('close', (event: Event) => {   // 👈 указываем тип
    if (!isQuiting) {
      event.preventDefault();
      win?.hide();
    }
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'icon.jpg'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Открыть',
      click: () => win?.show()
    },
    {
      label: 'Выход',
      click: () => {
        isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('My Tray App');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (win) {
      win.isVisible() ? win.hide() : win.show();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', (event: Event) => {
  event.preventDefault(); // чтобы приложение жило в трее
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

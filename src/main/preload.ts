import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  onPong(handler: () => void) {
    ipcRenderer.on('pong', handler);
    return () => ipcRenderer.off('pong', handler);
  },
  ping() {
    ipcRenderer.send('ping');
  },
});

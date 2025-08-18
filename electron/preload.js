// Preload script for enhanced security
// This script runs before the web content loads

import { contextBridge, ipcRenderer } from 'electron';

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // File operations (if needed later)
  openFile: () => ipcRenderer.invoke('open-file'),
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  
  // Notifications
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),
  
  // System info
  getPlatform: () => process.platform,
  isElectron: () => true
});

// Security: Remove Node.js globals in renderer process
delete window.require;
delete window.exports;
delete window.module;
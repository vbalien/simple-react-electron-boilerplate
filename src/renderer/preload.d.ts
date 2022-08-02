declare global {
  interface Window {
    electron: {
      onPong(handler: () => void): void;
      ping(): void;
    };
  }
}

export {};

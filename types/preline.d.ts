// src/types/preline.d.ts
export {};

declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: () => void;
    };
  }
}

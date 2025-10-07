/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SCRIPT_URL: string;
  // add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
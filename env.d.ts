/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  // Añade aquí otras variables de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

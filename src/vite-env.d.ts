/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_KEY: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
  readonly VITE_AUTH_HOST: string
  readonly VITE_API_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
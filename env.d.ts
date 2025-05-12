/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL: string;
  // outras variáveis do .env podem ser adicionadas aqui
}

// Não precisa declarar `glob` manualmente!
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

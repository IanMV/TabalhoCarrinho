
interface ImportMetaEnv {
    readonly VITE_LOCAL: string;
    // outras variáveis do .env podem ser adicionadas aqui
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
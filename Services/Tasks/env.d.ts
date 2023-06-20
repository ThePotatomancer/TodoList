declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      MONGO_CONNECTION_STRING: string;
    }
  }
}

export {};
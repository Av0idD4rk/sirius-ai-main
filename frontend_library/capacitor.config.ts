import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.av0idD4rk.ailibrary',
  appName: 'BookAI',
  webDir: 'out',
  server: {
    url: process.env.LIVE_UPDATE_URL,
    cleartext: true
  },
};

export default config;

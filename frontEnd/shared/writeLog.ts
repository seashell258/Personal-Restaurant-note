import { Platform } from 'react-native';

export function logToFileAndConsole(message: string) {
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  console.log(logMessage); // 終端顯示

  // 只有手機端才用 react-native-fs 寫檔
  if (Platform.OS !== 'web') {
    try {
      const RNFS = require('react-native-fs');
      const path = RNFS.DocumentDirectoryPath + '/app.log';
      RNFS.appendFile(path, logMessage, 'utf8').catch((err: any) => console.error(err));
    } catch (err) {
      console.error('RNFS load failed', err);
    }
  }
}

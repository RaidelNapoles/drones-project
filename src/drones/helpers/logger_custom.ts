import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class MyLogger extends Logger {
  debug(message: any) {
    // super.debug(message);
    const dest_path = './logging/';
    if (!fs.existsSync(dest_path)) {
      fs.mkdirSync(dest_path);
    }
    const date = new Date().toLocaleString();
    const displayedMessage = `${date} - ${message}\n`;
    fs.writeFileSync(dest_path + 'battery.log', displayedMessage, {
      flag: 'a',
    });
  }
}

import * as fs from 'fs';

export class Helper {
  static fileName(req, file, callback) {
    const _suffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const originalName = file.originalname.split('.')[0];
    callback(null, originalName + '-' + _suffix + '.' + fileExtension);
  }

  static destinationPath(req, file, callback) {
    const dest_path = './med_pictures/';
    if (!fs.existsSync(dest_path)) {
      fs.mkdirSync(dest_path);
    }
    callback(null, dest_path);
  }
}

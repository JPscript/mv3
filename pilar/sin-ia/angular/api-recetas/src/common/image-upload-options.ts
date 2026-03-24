import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

export function buildImageUploadOptions(): MulterOptions {
  return {
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    storage: diskStorage({
      destination: (_req, _file, cb) => {
        const destinationPath = join(process.cwd(), 'files');
        mkdirSync(destinationPath, { recursive: true });
        cb(null, destinationPath);
      },
      filename: (_req, file, cb) => {
        const safeExtension = extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${randomUUID()}${safeExtension}`;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        cb(new BadRequestException('Solo se permiten archivos de imagen'), false);
        return;
      }
      cb(null, true);
    },
  };
}
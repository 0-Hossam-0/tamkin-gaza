import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import languagesConfig from '../../../Config/Language/language.json';

@Injectable()
export class JsonFileService implements OnModuleInit {
  private readonly cache: Record<string, any> = {};
  private readonly baseDir = path.join(
    __dirname,
    '../../../../assets/translations',
  );

  getRawLanguageData(): typeof languagesConfig {
    const filePath = path.join(
      process.cwd(),
      'src/Config/Language/language.json',
    );

    if (!fs.existsSync(filePath))
      throw new Error(`Configuration file not found at: ${filePath}`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as typeof languagesConfig;
  }

  onModuleInit() {
    const languages = fs.readdirSync(this.baseDir);

    for (const lang of languages) {
      const langPath = path.join(this.baseDir, lang);

      if (!fs.statSync(langPath).isDirectory()) continue;

      this.cache[lang] = {};

      const modules = fs.readdirSync(langPath);

      for (const moduleFolder of modules) {
        const modulePath = path.join(langPath, moduleFolder);

        if (!fs.statSync(modulePath).isDirectory()) continue;

        this.cache[lang][moduleFolder] = {};

        const files = fs.readdirSync(modulePath);

        for (const file of files) {
          if (!file.endsWith('.json')) continue;

          const filePath = path.join(modulePath, file);
          const fileName = file.replace('.json', '');

          const fileContent = fs.readFileSync(filePath, 'utf8');
          this.cache[lang][moduleFolder][fileName] = JSON.parse(fileContent);
        }
      }
    }
  }

  public get(lang: string, pathKey: string, context?: { prop?: any }): string {
    try {
      if (!pathKey.includes(':')) return pathKey;

      const [moduleFolder, rest] = pathKey.split(':');

      if (!moduleFolder || !rest) return pathKey;

      const parts = rest.split('.');
      const fileName = parts.shift();

      if (!fileName || parts.length === 0) return pathKey;

      const translation = this.cache[lang]?.[moduleFolder]?.[fileName];

      if (!translation) return pathKey;

      let result = parts.reduce(
        (obj: any, key: string) =>
          obj && obj[key] !== undefined ? obj[key] : undefined,
        translation,
      );

      if (typeof result !== 'string') return pathKey;

      if (context?.prop) {
        const propValue = Array.isArray(context.prop)
          ? context.prop.join(', ')
          : context.prop;

        result = result.replace(/{prop}/g, propValue);
      }

      return result;
    } catch {
      return pathKey;
    }
  }
}

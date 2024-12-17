import { BaseService } from '@cool-midway/core';
import { Provide } from '@midwayjs/decorator';
import { IMidwayKoaApplication } from '@midwayjs/koa';
import { App } from '@midwayjs/core';
import moment = require('moment');

const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');

@Provide()
export class OujiTemplateService extends BaseService {
  @App()
  app: IMidwayKoaApplication;

  async generate(params) {
    const { name, lang = 'cn' } = params;

    const templateFilePath = path.join(
      this.app.getBaseDir(),
      '..',
      'src',
      'modules',
      'ouji',
      'templates',
      `${lang}`,
      `${name}.docx`
    );
    const content = fs.readFileSync(templateFilePath, 'binary');

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      ...params,
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      // Compression: DEFLATE adds a compression step.
      // For a 50MB document, expect 500ms additional CPU time.
      compression: 'DEFLATE',
    });

    const currentName = `${name}_${moment().format('YYYY_MM_DD_HH_mm_ss')}`;
    const writeTemplateFilePath = path.join(
      this.app.getBaseDir(),
      '..',
      'src',
      'modules',
      'ouji',
      'downloads',
      `${currentName}.docx`
    );
    fs.writeFileSync(writeTemplateFilePath, buf);

    return currentName;
  }
}

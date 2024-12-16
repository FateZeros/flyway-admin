import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Body } from '@midwayjs/decorator';
import { OujiTemplateService } from '../../service/template';

/**
 * 商品模块-商品信息
 */
@CoolController()
export class AdminOujiTemplateController extends BaseController {
  @Inject()
  oujiTemplateService: OujiTemplateService;

  @Post('/generate', { summary: '生成文档' })
  async generate(@Body() params) {
    return this.ok(await this.oujiTemplateService.generate(params));
  }
}

import { Provide, Inject, Get, Config } from '@midwayjs/decorator';
import {
  CoolController,
  BaseController,
  CoolEps,
  TagTypes,
  CoolUrlTag,
  CoolTag,
} from '@cool-midway/core';
import { Context } from '@midwayjs/koa';

/**
 * 不需要登录的后台接口
 */
@CoolUrlTag()
@Provide()
@CoolController()
export class BaseAppCommController extends BaseController {
  @Inject()
  ctx: Context;

  @Config('module.base.allowKeys')
  allowKeys: string[];

  @Inject()
  eps: CoolEps;

  /**
   * 实体信息与路径
   * @returns
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/eps', { summary: '实体信息与路径' })
  public async getEps() {
    return this.ok(this.eps.app);
  }
}

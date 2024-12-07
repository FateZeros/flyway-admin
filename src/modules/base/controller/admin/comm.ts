import {
  BaseController,
  CoolController,
  CoolTag,
  CoolUrlTag,
} from '@cool-midway/core';
import { ALL, Body, Get, Inject, Post, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysLoginService } from '../../service/sys/login';
import { BaseSysPermsService } from '../../service/sys/perms';
import { BaseSysUserService } from '../../service/sys/user';

/**
 * Base 通用接口 一般写不需要权限过滤的接口
 */
@CoolUrlTag()
@Provide()
@CoolController()
export class BaseCommController extends BaseController {
  @Inject()
  baseSysUserService: BaseSysUserService;

  @Inject()
  baseSysPermsService: BaseSysPermsService;

  @Inject()
  baseSysLoginService: BaseSysLoginService;

  @Inject()
  ctx: Context;

  /**
   * 获得个人信息
   */
  @Get('/person', { summary: '个人信息' })
  async person() {
    return this.ok(
      await this.baseSysUserService.person(this.ctx.admin?.userId)
    );
  }

  /**
   * 修改个人信息
   */
  @Post('/personUpdate', { summary: '修改个人信息' })
  async personUpdate(@Body(ALL) user: BaseSysUserEntity) {
    await this.baseSysUserService.personUpdate(user);
    return this.ok();
  }

  /**
   * 权限菜单
   */
  @Get('/permmenu', { summary: '权限与菜单' })
  async permmenu() {
    return this.ok(
      await this.baseSysPermsService.permmenu(this.ctx.admin.roleIds)
    );
  }

  /**
   * 退出
   */
  @Post('/logout', { summary: '退出' })
  async logout() {
    await this.baseSysLoginService.logout();
    return this.ok();
  }
}

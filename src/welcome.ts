import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as packageJson from '../package.json';

/**
 * 欢迎界面
 */
@Controller('/')
export class WelcomeController {
  @Inject()
  ctx: Context;

  @Get('/', { summary: '欢迎界面' })
  public async welcome() {
    await this.ctx.render('welcome', {
      text: `HELLO FLYWAY-ADMIN v${packageJson.version}`,
    });
  }
}

import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api')
class AppController {
  @Get('ping')
  ping() { return { ok: true, ts: Date.now() }; }

  @Post('ask')
  ask(@Body() body: { q: string }) {
    return { q: body?.q ?? '', a: `Вы спросили: ${body?.q ?? ''}` };
  }
}

@Module({ controllers: [AppController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(3001);
  console.log('NestJS API on http://localhost:3001');
}
bootstrap();

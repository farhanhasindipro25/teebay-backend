import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT: number = Number(configService.get('PORT'));

  await app.listen(PORT).then(() => {
    console.log(`
       ████████████████████████████████████████████████████████████████████
       █                                                                  █
       █                 🌐  WELCOME TO TEEBAY SERVER  🌐                 █
       █                                                                  █
       ████████████████████████████████████████████████████████████████████
       
       ──────────────────────────────────────────────────────────────────
                              SERVER INFORMATION                         
       ──────────────────────────────────────────────────────────────────
       
                 🔥  Status       : Running
                 🛠️   Environment  : ${configService.get('TARGET_ENV')}
                 🌐  Port         : ${configService.get('PORT')}
                 ⏰  Startup Time : ${new Date().toLocaleString()}
       
       ──────────────────────────────────────────────────────────────────       
       `);
  });
}
bootstrap();

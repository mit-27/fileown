import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JWTAuthGuard } from './core/auth/guards/auth.guard';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@fileown/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({
    origin: '*',
  });
  const document = generateOpenApi(contract, {
    info: {
      title: 'Posts API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }], // Apply bearer auth globally
  },

);

  
  app.useLogger(app.get(Logger));

  SwaggerModule.setup('swagger',app,document)


  await app.listen(3000);
}
bootstrap();

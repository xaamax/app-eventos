import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import metadata from './metadata'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuração do Swagger (Documentação da API automáticamente)
  const config = new DocumentBuilder()
    .setTitle('API Eventos')
    .setDescription('API de Gerenciamento de Eventos.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',        // Tipo de autenticação
        scheme: 'bearer',    // Esquema de autenticação
        bearerFormat: 'JWT', // Formato do token (padrão é JWT)
      },
      'Authorization', 
    )
    .build();

  // Carrega os metadados do plugin do Swagger (também gerado automáticamente pelo Script swc -b --check-type )
  await SwaggerModule.loadPluginMetadata(metadata);

  // Cria a documentação da API na rota /v1/docs/swagger
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('/v1/docs/swagger', app, documentFactory);

  // Pega a porta via variável de ambiente ou usa a porta 3000
  const configService: ConfigService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  await app.listen(port).then(() => {
    const now = new Date();
    setTimeout(() => {
      console.log(
        `Server running on http://localhost:${port} - ${now.toLocaleDateString()} ${now.toLocaleTimeString()} | Swagger: http://localhost:${port}/v1/docs/swagger`,
      );
    }, 1000);
  });
}
bootstrap();

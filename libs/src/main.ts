import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('📚 System Thesis Flow API')
    .setDescription(
      `
Sistema académico de gestión de tesis universitarias. Esta API permite:

- Registrar y actualizar contenido por secciones de una tesis.
- Gestionar el presupuesto asociado a cada tesis.
- Asignar y administrar estudiantes por tesis.
- Consultar y actualizar el estado de revisión de contenidos.
- Control de versiones, correcciones y flujos de aprobación.

🔐 Para versiones futuras se incluirá autenticación basada en JWT.

📎 Recursos:
- [Repositorio GitHub (privado)](https://github.com/tu-org/system-thesis-flow)
- [Guía de uso para backend](https://tu-org-docs/thesis-api)
- [Endpoints públicos y privados](http://localhost:3000/api-json)

`,
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Localhost dev server')
    .addServer('https://tesis.tu-universidad.edu/api', 'Servidor de producción')
    .addTag('Usuarios', 'Operaciones relacionadas con cuentas de usuarios')
    .addTag('Estudiantes de Tesis', 'Asignación y gestión de alumnos en tesis')
    .addTag('Contenido de Tesis', 'Redacción, revisión y control de secciones')
    .addTag(
      'Presupuesto de Tesis',
      'Asignación, edición y aprobación de gastos',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 System-Thesis-Flow ejecutándose en: http://localhost:${port}`);
  logger.log(
    `📑 Documentación Swagger disponible en: http://localhost:${port}/api`,
  );
}
bootstrap();

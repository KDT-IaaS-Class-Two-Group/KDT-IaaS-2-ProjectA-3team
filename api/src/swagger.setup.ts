import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('DelaN API Docs')
    .setDescription(
      `API 서버의 구성 명세 | 
      기본적인 라우팅 구조부터, 내부에 존재하는 DTO, Entity를 정의하는 문서입니다. `,
    )
    .setVersion('1.0.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}

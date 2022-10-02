import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // validation을 위한 decorator가 없 속성 제거
      // forbidNonWhitelisted: true, // whitelist 설정에서 걸리는 request 있다면 request 요청을 막음 (400 error)
      transform: true, // 요청에서 넘어온 자료를 자동 형변환 ex) /board/12 url id 값을 '12' => 12 number로 바꿔줌
    }),
  );
  await app.listen(3000);
}
bootstrap();

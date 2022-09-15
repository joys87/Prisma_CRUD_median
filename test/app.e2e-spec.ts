import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    ); 
    /* main.ts 를 보면 프로젝트 내에서도 GlobalPipes 를 적용해줬음을 알 수 있다. 
    우리가 앱을 실행하는 것과 테스트 어플리케이션이 일한 환경에서 동작할 수 있도록 하기 위해, 
    e2e파일 내에서도 Globalpipes를 적용해 주었다. */ 

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});


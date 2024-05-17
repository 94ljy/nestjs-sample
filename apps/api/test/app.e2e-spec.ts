import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('회원가입 성공', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@test.com',
        password: 'test',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.status).toBe('OK');
      });
  });
});

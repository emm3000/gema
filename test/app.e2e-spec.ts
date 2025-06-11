import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { JwtService } from '@nestjs/jwt'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let accessToken: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    jwtService = moduleFixture.get(JwtService)

    accessToken = jwtService.sign(
      {
        sub: 'user123',
        email: 'test@example.com',
      },
      {
        secret: process.env.JWT_SECRET || 'defaultsecret',
        expiresIn: '1h',
      },
    )
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .expect((res) => {
        console.log(res.body)
      })
  })
})

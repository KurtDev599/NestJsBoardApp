import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigService } from './config/database/postgres.service';
import { PostgresConfigModule } from './config/database/postgres.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    JwtModule.register({
      secret: 'Secret5368',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    BoardsModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

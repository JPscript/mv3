import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbLogging =
          config.get<string>('DB_LOGGING', 'true').toLowerCase() === 'true';

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: Number(config.get<string>('DB_PORT', '5432')),
          username: config.get<string>('DB_USER', 'postgres'),
          password: config.get<string>('DB_PASSWORD', ''),
          database: config.get<string>('DB_NAME', 'api_recetas_db'),
          // Fuerza UTF-8 en el cliente para evitar texto corrupto con tildes.
          extra: {
            client_encoding: config.get<string>('DB_CLIENT_ENCODING', 'UTF8'),
          },
          autoLoadEntities: true,
          synchronize: false,
          logging: dbLogging,
        };
      },
    }),
    RecipesModule,
  ],
})
export class AppModule {}
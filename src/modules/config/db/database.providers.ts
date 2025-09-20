import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432, // исправлено
        username: 'postgres', // ваш пользователь
        password: 'user228', // ваш пароль
        database: 'labone', // ваша база
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true, // true только для разработки!
      });

      return dataSource.initialize();
    },
  },
];

import { Test, TestingModule } from '@nestjs/testing';
import { AppNameController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppNameController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppNameController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppNameController>(AppNameController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getName()).toBe('Hello World!');
    });
  });
});

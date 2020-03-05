import {
  HttpModule,
  Module,
} from '@nestjs/common';
import { UsersService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [HttpModule],
  providers: [UsersService],
  controllers: [ItemsController]
})
export class ItemsModule {}

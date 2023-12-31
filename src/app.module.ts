import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {PostModule} from './post/post.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule, PostModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

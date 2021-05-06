import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { PostsService } from './posts.service';

@Module({
    providers: [AuthorsResolver, AuthorsService, PostsService],
})
export class AuthorsModule {}

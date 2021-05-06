import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { DateScalar } from 'src/common/scalars/date.scalar';

@Module({
    providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}

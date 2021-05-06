import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Query((returns) => Recipe)
    async recipe(@Args('id') id: string): Promise<Recipe> {
        const recipe = await this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }

        return recipe;
    }

    @Query(() => [Recipe])
    recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return this.recipesService.findAll(recipesArgs);
    }

    @Mutation((returns) => Recipe)
    async addRecipe(
        @Args('newRecipeData') createRecipeInput: CreateRecipeInput,
    ): Promise<Recipe> {
        const recipe = await this.recipesService.create(createRecipeInput);
        pubSub.publish('recipeAdded', { recipeAdded: recipe });
        return recipe;
    }

    @Mutation((returns) => Boolean)
    async removeRecipe(@Args('id') id: string) {
        return this.recipesService.remove(id);
    }

    @Subscription((returns) => Recipe)
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
}

import { RecipeConfig, RecipeVariantRecord } from "@pandacss/dev";

import { badge } from "./badge/recipe";

type RecipeType = Partial<RecipeConfig<RecipeVariantRecord>>;
type RecipesType = Record<string, RecipeType>;

const recipes: RecipesType = {
  badge,
};

export default recipes;

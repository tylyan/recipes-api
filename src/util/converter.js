module.exports = function(recipe) {
	const clientRecipe = {}
	clientRecipe.id = recipe.id
	clientRecipe.name = recipe.name
	clientRecipe.tags = recipe.tags
	clientRecipe.creationDate = recipe.creation_date
	clientRecipe.lastModified = recipe.last_modified
	clientRecipe.ingredients = recipe.ingredients
	clientRecipe.steps = recipe.steps
	clientRecipe.notes = recipe.notes
	return clientRecipe
}
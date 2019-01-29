const Handler = require('../handlers/recipe.handler')

const Routes = [
	{
		method: 'GET',
		path: '/recipes',
		handler: Handler.getAllRecipes
	},
	{
		method: 'GET',
		path: '/recipe',
		handler: Handler.getRecipe
	},
	{
		method: 'GET',
		path: '/recipe/{id}',
		handler: Handler.getRecipe
	},
	{
		method: 'POST',
		path: '/recipe',
		handler: Handler.createRecipe
	}
	,
	{
		method: 'PUT',
		path: '/recipe/{id}',
		handler: Handler.updateRecipe
	}
	,
	{
		method: 'DELETE',
		path: '/recipe/{id}',
		handler: Handler.deleteRecipe
	}
]

module.exports = Routes
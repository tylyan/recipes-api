const Recipe = require('../models/recipe.model')
const Boom = require('boom')
const validate = require('../util/validator')

const Handler = {

	getAllRecipes: async function(request, h) {
		try {
			return await Recipe.find()
		} catch(e) {
			request.logger.error(e)
			return new Boom(e)
		}
	},

	getRecipe: async function(request, h) {
		try {
			const recipe = await Recipe.findById(request.params.id)
			if (!recipe) {
				return Boom.notFound()
			}
			return recipe
		} catch(e) {
			request.logger.error(e)
			return new Boom(e)
		}
	},

	createRecipe: async function(request, h) {
		if (!validate(request.payload)) {
			return Boom.badRequest("Insufficient data provided for recipe")
		}
		const recipe = new Recipe({
			name: request.payload.name,
			submitted_date: Date.now(),
			ingredients: request.payload.ingredients,
			steps: request.payload.steps,
			tags: request.payload.tags
		})
		try {
			const savedRecipe = await recipe.save()
			return { id: savedRecipe.id }
		} catch (e) {
			request.logger.error(e)
			if (e.code === 11000) {
				return Boom.conflict("A recipe with this name already exists")
			} else {
				return new Boom(e)
			}
		}
	},

	updateRecipe: async function(request, h) {
		if (!validate(request.payload)) {
			return Boom.badRequest("Insufficient data provided for recipe")
		}
		const updates = {
			name: request.payload.name,
			ingredients: request.payload.ingredients,
			steps: request.payload.steps,
			tags: request.payload.tags || []
		}
		try {
			const updated = await Recipe.findByIdAndUpdate(request.params.id, updates, { new: true })
			if (!updated) {
				return Boom.notFound()
			}
			return updated
		} catch (e) {
			request.logger.error(e)
			if (e.code === 11000) {
				return Boom.conflict("A recipe with this name already exists")
			} else {
				return new Boom(e)
			}
		}
	},

	deleteRecipe: async function(request, h) {
		try {
			const deleted = await Recipe.findByIdAndDelete(request.params.id)
			if (!deleted) {
				return Boom.notFound()
			}
			return deleted
		} catch(e) {
			request.logger.error(e)
			return new Boom(e)
		}
	}
}

module.exports = Handler
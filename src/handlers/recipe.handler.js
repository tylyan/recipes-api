const Recipe = require('../models/recipe.model')
const Boom = require('boom')
const validate = require('../util/validator')
const convert = require('../util/converter')

const Handler = {

	getAllRecipes: async function(request, h) {
		try {
			let recipes = await Recipe.find()
			const response = []
			recipes.forEach(function(recipe) {
				response.push(convert(recipe))
			})
			return response
		} catch(e) {
			request.logger.error(e)
			return new Boom(e)
		}
	},

	getRecipe: async function(request, h) {
		try {
			let recipe
			if (request.params.id) {
				recipe = await Recipe.findById(request.params.id)
			} else if (request.query.name) {
				console.log(request.query.name)
				recipe = await Recipe.findOne({'name_lower': request.query.name})
			} else {
				return Boom.badRequest("Insufficent data to complete request")
			}
			if (!recipe) {
				return Boom.notFound()
			}
			console.log(recipe.name_lower)
			return convert(recipe)
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
			name_lower: request.payload.name.toLowerCase(),
			creation_date: Date.now(),
			last_modified: Date.now(),
			ingredients: request.payload.ingredients,
			steps: request.payload.steps,
			tags: request.payload.tags,
			notes: request.payload.notes
		})
		try {
			const savedRecipe = await recipe.save()
			return convert(savedRecipe)
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
			name_lower: request.payload.name.toLowerCase(),
			last_modified: Date.now(),
			ingredients: request.payload.ingredients,
			steps: request.payload.steps,
			tags: request.payload.tags,
			notes: request.payload.notes
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
			return convert(deleted)
		} catch(e) {
			request.logger.error(e)
			return new Boom(e)
		}
	}
}

module.exports = Handler
const mongoose = require('mongoose')
const uuid = require('uuid')
const titleCase = require('../util/string.helper').titleCase

const Schema = mongoose.Schema
const Types = mongoose.Schema.Types;

const RecipeSchema = new Schema({
	_id: {
		type: Types.String,
		default: uuid.v1
	},
	name: {
      	type: Types.String,
      	required: true,
      	unique: true,
      	set: titleCase
    },
    submitted_date: {
    	type: Types.Date,
    	required: true
    },
    ingredients: {
      	type: [Types.String],
      	required: true
    },
    steps: {
      	type: [Types.String],
      	required: true
    },
    tags: {
    	type: [Types.String],
    	required: false
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema)
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
  	set: titleCase
  },
  name_lower: {
    type: Types.String,
    required: true,
    set: (s) => { return s.toLowerCase() },
    unique: true
  },
  creation_date: {
  	type: Types.Date,
  	required: true
  },
  last_modified: {
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
  },
  notes: {
    type: [Types.String],
    required: false
  }
})

RecipeSchema.virtual('id').get(function() {
  return this._id
})

module.exports = mongoose.model('Recipe', RecipeSchema)
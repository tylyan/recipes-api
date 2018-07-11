const listValidator = (list) => {
	return list !== null && list.length > 0
}

const payloadValidator = (payload) => {
		return payload.name
			&& listValidator(payload.ingredients)
			&& listValidator(payload.steps)
	}

module.exports = payloadValidator
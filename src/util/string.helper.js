const stringHelper = { }

stringHelper.titleCase = (s) => {
	return s.split(' ').map((word) => {
		return word[0].toUpperCase() + word.slice(1)
	}).join(' ')
}

module.exports = stringHelper
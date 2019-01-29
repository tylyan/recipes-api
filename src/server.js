'use strict'

const Hapi = require('hapi')
const fs = require('fs')
const logStream = fs.createWriteStream('logs/app.log', { flags: 'a' })

const start = async () => {

	const server = new Hapi.server({
		port: 3000,
		host: 'localhost',
		routes: {
			cors: true
		}
	})

	await server.register({
		plugin: require('hapi-pino'),
		options: {
			prettyPrint: false,
			stream: logStream
		}
	})

	require('./data/database').init(server)

	server.route(require('./routes/recipe.routes'))

	await server.start()

	server.logger().info(`Server running at: ${server.info.uri}`)

	process.on('unhandledRejection', (err) => {
		server.logger().error(err)
		logStream.end()
		process.exit(1)
	})
}

start()
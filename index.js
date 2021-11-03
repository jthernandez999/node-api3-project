// require your server and launch it
const server = require('./api/server')
require('colors')

const PORT = 6000
server.listen(PORT, () => console.log(`\n*** server is listening on ${PORT}`.bgGreen))
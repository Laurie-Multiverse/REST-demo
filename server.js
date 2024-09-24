const app = require('./src/app')
const port = 3000
const { db } = require('./db/connection')

app.listen(port, async () => {
    await db.sync();
    console.log(`listening at http://localhost:${port}`)
})
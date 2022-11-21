import config from 'config'
import mongoose from "mongoose"

async function connect() {
    const dbUri = config.get<string>('dbUri')
    try {
        await mongoose.connect(dbUri)
        console.log("Connected to Db")
    } catch {
        console.error('Could not connect to DB')
        process.exit(1)
    }
}

export default connect
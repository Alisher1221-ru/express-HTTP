import {config} from "dotenv"
import { cleanEnv, num, str } from "envalid"

config()

const env = cleanEnv(process.env, {
    PORT: num()
})

export default env

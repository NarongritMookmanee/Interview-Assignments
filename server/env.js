import dotenv from "dotenv"

export default class {
    _init() {
        if (process.env.NODE_ENV === 'production') {
            dotenv.config({ path: './.env.production' })
            console.log('USED NODE_ENV = PRODUCTION')
        } else {
            dotenv.config({ path: './.env.development' })
            console.log('USED NODE_ENV = DEVELOPMENT')
        }
    }
}
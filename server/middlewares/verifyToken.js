import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export default function auth(req, res, next) {
    const methodUrl = `${req.method} ${req.originalUrl}`
    console.log(methodUrl)

    switch (methodUrl) { // exception url
        case 'POST /login':     // login
            return next()
        case 'POST /api/users': // create new user
            return next()
        default:
            null
    }

    const token = req.cookies.auth_token || req.headers.authorization?.split(' ')[1]
    // const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            status: 'Failed',
            message: 'No token provided'
        })
    }
    
    try {
        console.log('token_credential => ', jwt.verify(token, process.env.JWT_SECRET_KEY))
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        console.error(e)
        res.status(401).json({ message: e.message });
    }
}
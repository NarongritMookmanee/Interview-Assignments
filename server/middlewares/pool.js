import DBModelConnection from "../models/dbModelConnection.js";

export default function poolMiddleware(poolConnection) {
    return (req, res, next) => {
        req.pool = poolConnection
        next()
    }
}
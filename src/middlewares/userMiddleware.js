import db from "../config/database.js";

export async function checkUser(req, res, next) {
    let token = req.headers.authorization;

    if (!token) return res.sendStatus(401);
    token = token.replace("Bearer ", "");
    try {

        const record = await db.query(`SELECT sessions.token, sessions_users.id_user FROM sessions JOIN sessions_users ON sessions.id = sessions_users.id_session WHERE token = $1;`, [token]);
        if (!record.rowCount) return res.sendStatus(401);

        res.locals.user = record.rows[0].id_user;
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}
import db from '../config/database.js';
import { urlSchema } from '../schemas/urlSchema.js';

export async function checkUrl(req, res, next) {
    let token = req.headers.authorization;
    const data = req.body;

    if (!token) return res.sendStatus(401);

    const validation = urlSchema.validate(data, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    token = token.replace("Bearer ", "");
    try {
        const record = await db.query(`SELECT sessions.token, sessions_users.id_user FROM sessions JOIN sessions_users ON sessions.id = sessions_users.id_session WHERE token = $1;`, [token]);
        if (!record.rowCount) {
            return res.sendStatus(401);
        }

        const urlExists = await db.query(`SELECT * FROM urls WHERE url = $1;`, [data.url]);
        if (urlExists.rowCount) {
            return res.sendStatus(422);
        }

        res.locals.user = record.rows[0].id_user;
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function checkDelete(req, res, next) {
    let token = req.headers.authorization;
    const { id } = req.params;

    if (!token) return res.sendStatus(401);
    token = token.replace("Bearer ", "");
    try {
        const userId = await db.query(`SELECT sessions_users.id_user FROM sessions_users JOIN sessions ON sessions_users.id_session = sessions.id WHERE sessions.token = $1;`, [token]);
        if(!userId.rowCount) return res.sendStatus(401);

        const proprietyUrl = await db.query(`SELECT * FROM users_urls WHERE id_url = $1;`, [id]);
        if(!proprietyUrl.rowCount) return res.sendStatus(404);
       
        if (userId.rows[0].id_user !== proprietyUrl.rows[0].id_user) {
            return res.sendStatus(401);
        }
        res.locals.urlId = proprietyUrl.rows[0].id_url;
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}

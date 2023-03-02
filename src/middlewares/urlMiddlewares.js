import db from '../config/database.js';
import {urlSchema} from '../schemas/urlSchema.js';

export async function checkUrl (req, res, next){
    let token = req.headers.authorization; 
    const data = req.body;
    

    if(!token) return res.sendStatus(401);

    const validation = urlSchema.validate(data, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors); 
    }

    token = token.replace("Bearer", "");
   
    try {
       const record = await db.query(`SELECT * FROM sessions JOIN sessions_users ON sessions.id = sessions_users.id_session WHERE token = $1;`, [token]);
       if(!record.rowCount){
        return res.sendStatus(401);
       }

       const urlExists = await db.query(`SELECT * FROM urls WHERE url = $1;`, [data.url]);
       if(urlExists.rowCount){
        return res.sendStatus(422);
       }

       res.locals.user = record.rows[0].id_user;
       next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}



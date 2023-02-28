import db from "../config/database.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function signUp(req, res){
    const {name, email, password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    
    try {
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, passwordHash]);
        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res){
    const id = res.locals.idUser;
    
    try {
        const session = await db.query(`SELECT * 
        FROM sessions_users 
        JOIN sessions 
            ON sessions_users.id_session = sessions.id 
            WHERE sessions_users.id_user = $1;`, [id]);

        if(session.rowCount){
            return res.status(200).send(session.rows[0].token);
        }

        const token = uuid();
        await db.query(`INSERT INTO sessions (token) VALUES ($1);`, [token]);
        const newSession = await db.query(`SELECT id FROM sessions WHERE token = $1;`, [token]);
        await db.query(`INSERT INTO sessions_users (id_session, id_user) VALUES ($1, $2);`, [newSession.rows[0].id, id]);
        res.status(200).send(token);
        

    } catch (error) {
        res.status(500).send(error.message);
    }

}




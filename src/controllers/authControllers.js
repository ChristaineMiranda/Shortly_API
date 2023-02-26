import db from "../config/database.js";
import bcrypt, {compareSync} from 'bcrypt';

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


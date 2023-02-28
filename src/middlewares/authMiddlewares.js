import db from "../config/database.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import { compareSync } from 'bcrypt';

export async function checkSignUp(req, res, next){
    const data = req.body;
    const validation = signUpSchema.validate(data, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }
    try {
        
        const record = await db.query(`SELECT * FROM users WHERE email = $1;`, [data.email]);
        if(record.rowCount){
            return res.sendStatus(409);
        }
        next(); 

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function checkSignIn(req, res, next){
    const data = req.body;
    const validation = signInSchema.validate(data, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors); 
    }

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [data.email]);
    
        if(!user.rowCount || !compareSync(data.password, user.rows[0].password)){
            return res.sendStatus(401);
        } 
        res.locals.idUser = user.rows[0].id;
      
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}
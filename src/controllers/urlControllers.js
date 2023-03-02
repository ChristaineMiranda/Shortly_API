import db from "../config/database.js";
import {nanoid} from 'nanoid';

export async function shortener(req, res){
    const {url} = req.body;
    const shortenedLink = nanoid();
    
    try {
        await db.query(`INSERT INTO urls (url, short_url) VALUES ($1, $2);`, [url, shortenedLink]);
        const newURL = await db.query(`SELECT id FROM urls WHERE url = $1;`, [url]);
        await db.query(`INSERT INTO users_urls (id_user, id_url) VALUES ($1, $2);`, [res.locals.user, newURL.rows[0].id]);
        const toSend = {id: newURL.rows[0].id, shortUrl: shortenedLink};

        res.status(201).send(toSend);



        
    } catch (error) {
        res.status(500).send(error.message);
    }

}
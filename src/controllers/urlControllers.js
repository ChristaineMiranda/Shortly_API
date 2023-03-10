import db from "../config/database.js";
import { nanoid } from 'nanoid';

export async function shortener(req, res) {
    const { url } = req.body;
    const shortenedLink = nanoid();

    try {
        await db.query(`INSERT INTO urls (url, short_url) VALUES ($1, $2);`, [url, shortenedLink]);
        const newURL = await db.query(`SELECT id FROM urls WHERE url = $1;`, [url]);
        await db.query(`INSERT INTO users_urls (id_user, id_url) VALUES ($1, $2);`, [res.locals.user, newURL.rows[0].id]);
        await db.query(`UPDATE users SET link_total = link_total + 1 WHERE id = $1;`, [res.locals.user]);
        const toSend = { id: newURL.rows[0].id, shortUrl: shortenedLink };

        res.status(201).send(toSend);

    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const urlRecord = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
        if (!urlRecord.rowCount) {
            return res.sendStatus(404);
        }
        const toSend = {
            id,
            shortUrl: urlRecord.rows[0].short_url,
            url: urlRecord.rows[0].url
        }
        res.status(200).send(toSend);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function redirect(req, res) {
    const { shortUrl } = req.params;
    try {
        const shortUrlExists = await db.query(`SELECT * FROM urls WHERE short_url = $1;`, [shortUrl]);

        if (!shortUrlExists.rowCount) {
            return res.sendStatus(404);
        }
        await db.query(`UPDATE urls SET visit_count = visit_count + 1 WHERE short_url = $1;`, [shortUrl]);
        const dataUser = await db.query(`SELECT users_urls.id_user FROM urls JOIN users_urls ON urls.id = users_urls.id_url WHERE short_url = $1;`, [shortUrl]);
        await db.query(`UPDATE users SET visit_total = visit_total + 1 WHERE id = $1;`, [dataUser.rows[0].id_user]);
        res.redirect(shortUrlExists.rows[0].url);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function deleteById(req, res) {
    try {
        await db.query(`DELETE FROM users_urls WHERE id_url = $1;`, [res.locals.urlId]);
        await db.query(`DELETE FROM urls WHERE id = $1;`, [res.locals.urlId]);
        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function ranking(req, res){
    try {
        const list = await db.query(`SELECT id, name, link_total AS "linksCount", visit_total AS "visitCount" FROM users ORDER BY visit_total DESC LIMIT 10;`);
        res.status(200).send(list.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
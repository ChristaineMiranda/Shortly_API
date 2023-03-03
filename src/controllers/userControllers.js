import db from "../config/database.js";

export async function dataUser(req, res) {
    const id = res.locals.user;
    try {
        const data = await db.query(`SELECT users.id, users.name, users.visit_total AS "visitCount", json_agg(
            json_build_object(
                     'id', urls.id,
                     'shortUrl', urls.short_url,
                     'url', urls.url,
                     'visitCount', urls.visit_count
                 )
        ) AS "shortenedUrls" FROM users JOIN users_urls ON users.id = users_urls.id_user JOIN urls ON users_urls.id_url = urls.id
        WHERE users.id = $1 GROUP BY users.id;`, [id]);
        
        res.status(200).send(data.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
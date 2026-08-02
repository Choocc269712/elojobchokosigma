export default async function handler(req, res) {

    const tag = req.query.tag?.replace("#", "");

    if (!tag) {
        return res.status(400).json({
            error: "Tag não informada."
        });
    }

    try {

        const resposta = await fetch(
            `https://api.brawlstars.com/v1/players/%23${tag}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}`
                }
            }
        );

        const dados = await resposta.json();

        res.status(resposta.status).json(dados);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

}
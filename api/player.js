export default async function handler(req, res) {

    const tag = req.query.tag;

    if (!tag) {
        return res.status(400).json({
            erro: "Tag não informada."
        });
    }

    const resposta = await fetch(

        `https://api.brawlstars.com/v1/players/%23${tag.replace("#","")}`,

        {
            headers: {
                Authorization: `Bearer ${process.env.BRAWL_API_TOKEN}`
            }
        }

    );

    const dados = await resposta.json();

    res.status(200).json(dados);

}
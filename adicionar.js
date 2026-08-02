const form = document.getElementById("form");

const SENHAS = [
    "choocc123",
    "joao456"
];

let player = null;

form.onsubmit = async (e) => {

    e.preventDefault();

    const senha = document.getElementById("senha").value;

    if (!SENHAS.includes(senha)) {
        alert("Senha incorreta!");
        document.getElementById("senha").value = "";
        return;
    }

    if (!player) {
        alert("Busque um jogador válido primeiro.");
        return;
    }

    const horas = Number(document.getElementById("horas").value);

    const fim = new Date();
    fim.setHours(fim.getHours() + horas);

    const { error } = await db
        .from("jobs")
        .insert({

            boost: document.getElementById("boost").value,

            booster: document.getElementById("booster").value,

            preco: Number(document.getElementById("preco").value),

            fim: fim.toISOString(),

            ranked_rank: player.rankedRankName?.default ?? "Sem Ranked",

            ranked_elo: player.rankedElo ?? 0,

            highest_rank: player.highestAllTimeRankedRankName?.default ?? "Sem Ranked"

        });

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    alert("Elojob adicionado com sucesso!");

    window.location.href = "index.html";
};

const tagInput = document.getElementById("tag");

tagInput.addEventListener("input", async () => {

    const tag = tagInput.value.trim().replace("#", "");

    if (tag.length < 3) {

        document.getElementById("player-info").style.display = "none";
        player = null;
        return;

    }

    try {

        const resposta = await fetch(`/api/player?tag=${tag}`);

        if (!resposta.ok) {
            throw new Error("Jogador não encontrado");
        }

        player = await resposta.json();

        document.getElementById("player-name").textContent =
            player.rankedRankName?.default ?? "Sem Ranked";

        document.getElementById("player-trophies").textContent =
            `${player.rankedElo?.toLocaleString("pt-BR") ?? 0} Elo`;

        document.getElementById("player-club").textContent =
            player.highestSeasonRankedRankName?.default ?? "Sem temporada";

        document.getElementById("player-level").textContent =
            player.highestAllTimeRankedRankName?.default ?? "Sem histórico";

        document.getElementById("player-info").style.display = "block";

    } catch (e) {

        console.error(e);

        player = null;

        document.getElementById("player-info").style.display = "none";

    }

});
const form = document.getElementById("form");

const SENHAS = [
    "choocc123",
    "joao456"
];

form.onsubmit = async (e) => {

    e.preventDefault();

    const senha = document.getElementById("senha").value;

    if (!SENHAS.includes(senha)) {
        alert("Senha incorreta!");
        document.getElementById("senha").value = "";
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
            fim: fim.toISOString()
        });

    if (error) {
        console.error(error);
        alert("Erro ao adicionar o elojob:\n" + error.message);
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
        return;

    }

    try {

        const resposta = await fetch(`/api/player?tag=${tag}`);

        if (!resposta.ok) {
            throw new Error("Jogador não encontrado");
        }

        const player = await resposta.json();

        document.getElementById("player-name").textContent = player.name;

        document.getElementById("player-trophies").textContent =
            player.trophies.toLocaleString("pt-BR");

        document.getElementById("player-club").textContent =
            player.club ? player.club.name : "Sem clube";

        document.getElementById("player-level").textContent =
            player.expLevel;

        document.getElementById("player-info").style.display = "block";

    } catch (e) {

        console.error(e);

        document.getElementById("player-info").style.display = "none";

    }

});
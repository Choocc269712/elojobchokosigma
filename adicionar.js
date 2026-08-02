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

tagInput.addEventListener("input", () => {

    const tag = tagInput.value.trim();

    if (tag.length < 5) {

        document.getElementById("player-info").style.display = "none";
        return;

    }

    document.getElementById("player-name").textContent = "Joãozinho";

    document.getElementById("player-trophies").textContent = "31.245";

    document.getElementById("player-club").textContent = "Lunars";

    document.getElementById("player-level").textContent = "198";

    document.getElementById("player-info").style.display = "block";

});
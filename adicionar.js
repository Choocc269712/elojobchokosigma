const form = document.getElementById("form");

const SENHAS = [
    "choocc123",
    "joao456"
];

form.onsubmit = async (e) => {

    e.preventDefault();

    const senha = prompt("Digite a senha:");

    if (!SENHAS.includes(senha)) {
        alert("Senha incorreta!");
        return;
    }

    const horas = parseInt(document.getElementById("horas").value);

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
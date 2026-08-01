const SENHAS = [
    "choocc123",
    "joao456"
];

const senha = prompt("Digite a senha:");

if (!SENHAS.includes(senha)) {
    alert("Senha incorreta!");
    return;
}
const form = document.getElementById("form");

form.onsubmit = async (e) => {
    e.preventDefault();

    const horas = parseInt(document.getElementById("horas").value);

    const fim = new Date();
    fim.setHours(fim.getHours() + horas);

    const { error } = await db
        .from("jobs")
        .insert({
            boost: document.getElementById("boost").value,
            booster: document.getElementById("booster").value,
            fim: fim.toISOString()
            preco: Number(document.getElementById("preco").value)
        });

    if (error) {
        console.error(error);
        alert("Erro: " + error.message);
        return;
    }

    alert("Elojob adicionado com sucesso!");

    window.location.href = "index.html";
};
const form = document.getElementById("form");

const SENHAS = [
    "choocc123",
    "joao456"
];

const id = new URLSearchParams(window.location.search).get("id");

async function carregar() {

    const { data, error } = await db
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        alert("Erro ao carregar o elojob.");
        console.error(error);
        return;
    }

    document.getElementById("boost").value = data.boost;
    document.getElementById("booster").value = data.booster;
    document.getElementById("preco").value = data.preco;

    const horas = Math.max(
        0,
        Math.ceil((new Date(data.fim) - new Date()) / 1000 / 60 / 60)
    );

    document.getElementById("horas").value = horas;
}

carregar();

form.onsubmit = async (e) => {

    e.preventDefault();

    const senha = document.getElementById("senha").value;

    if (!SENHAS.includes(senha)) {
        alert("Senha incorreta!");
        return;
    }

    const horas = parseInt(document.getElementById("horas").value);

    const fim = new Date();
    fim.setHours(fim.getHours() + horas);

    const { error } = await db
        .from("jobs")
        .update({
            boost: document.getElementById("boost").value,
            booster: document.getElementById("booster").value,
            preco: Number(document.getElementById("preco").value),
            fim: fim.toISOString()
        })
        .eq("id", id);

    if (error) {
        alert("Erro ao editar o elojob.");
        console.error(error);
        return;
    }

    alert("Elojob atualizado!");

    window.location.href = "index.html";
};
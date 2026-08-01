const cards = document.getElementById("cards");

async function atualizar() {

    const { data: jobs, error } = await db
        .from("jobs")
        .select("*")
        .order("fim");

    if (error) {
        console.error(error);
        return;
    }

    cards.innerHTML = "";

    jobs.forEach(job => {

        const diff = new Date(job.fim) - new Date();

        let tempo;

        if (diff <= 0) {

            tempo = "Finalizado";

        } else {

            const horas = Math.floor(diff / 1000 / 60 / 60);
            const minutos = Math.floor(diff / 1000 / 60) % 60;
            const segundos = Math.floor(diff / 1000) % 60;

            tempo = `${horas}h ${minutos}m ${segundos}s`;

        }


cards.innerHTML += `
<div class="card ${diff <= 0 ? "finalizado" : ""}">

    <div class="label">Tempo restante</div>
    <div class="timer">${tempo}</div>

    <div class="info">
        <div class="label">Boost</div>
        <div class="value">${job.boost}</div>
    </div>

    <div class="info">
        <div class="label">Boostando</div>
        <div class="value">${job.booster}</div>
    </div>

    <div class="info">
        <div class="label">Preço</div>
        <div class="preco">$${Number(job.preco).toFixed(2)}</div>
    </div>

    <div class="botoes">
        <button class="botao-editar" onclick="editar(${job.id})">
            ✏ Editar
        </button>

        <button class="botao-excluir" onclick="excluir(${job.id})">
            🗑 Excluir
        </button>
    </div>

</div>
`;

})
}

atualizar();
setInterval(atualizar, 1000);
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

    let ativos = 0;
    let finalizados = 0;
    let valorTotal = 0;

    const boosters = new Set();

    jobs.forEach(job => {

        const agora = new Date();

        const fim = new Date(job.fim);

        const diff = fim - agora;

        let tempo;

        let progresso = 100;

        if (diff <= 0) {

            tempo = "Finalizado";
            progresso = 100;
            finalizados++;

        } else {

            ativos++;

            const horas = Math.floor(diff / 1000 / 60 / 60);
            const minutos = Math.floor(diff / 1000 / 60) % 60;
            const segundos = Math.floor(diff / 1000) % 60;

            tempo = `${horas}h ${minutos}m ${segundos}s`;

            const total = Number(job.horas || horas);

            if (total > 0) {

                progresso = Math.min(
                    100,
                    Math.max(
                        0,
                        (diff / (1000 * 60 * 60 * total)) * 100
                    )
                );

            }

        }

        valorTotal += Number(job.preco);

        boosters.add(job.booster);

        cards.innerHTML += `

<div class="card ${diff <= 0 ? "finalizado" : ""}">

    <div class="label">Tempo restante</div>

    <div class="timer">${tempo}</div>

    <div class="barra">

        <div class="progresso" style="width:${progresso}%"></div>

    </div>

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

    });

    document.getElementById("ativos").textContent = ativos;

    document.getElementById("valor").textContent = "$" + valorTotal.toFixed(2);

    document.getElementById("boosters").textContent = boosters.size;

    document.getElementById("finalizados").textContent = finalizados;

}

atualizar();

setInterval(atualizar, 1000);

function editar(id) {

    window.location.href = `editar.html?id=${id}`;

}

async function excluir(id) {

    if (!confirm("Deseja excluir este elojob?")) return;

    const { error } = await db

        .from("jobs")

        .delete()

        .eq("id", id);

    if (error) {

        alert("Erro ao excluir.");

        console.error(error);

        return;

    }

    atualizar();

}
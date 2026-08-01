const cards = document.getElementById("cards");

async function atualizar() {

    const { data: jobs, error } = await supabase
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
            <div class="card">
                <div class="info">
                    <div class="label">Tempo restante</div>
                    <div class="value">${tempo}</div>
                </div>

                <div class="info">
                    <div class="label">Boost</div>
                    <div class="value">${job.boost}</div>
                </div>

                <div class="info">
                    <div class="label">Boostando</div>
                    <div class="value">${job.booster}</div>
                </div>
            </div>
        `;
    });

}

atualizar();
setInterval(atualizar, 1000);
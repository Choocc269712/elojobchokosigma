let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const cards = document.getElementById("cards");

function atualizar(){

    cards.innerHTML="";

    jobs.forEach(job=>{

        let fim = new Date(job.fim);

        let agora = new Date();

        let diff = fim-agora;

        let tempo;

        if(diff<=0){

            tempo="Finalizado";

        }else{

            let horas=Math.floor(diff/1000/60/60);

            let minutos=Math.floor(diff/1000/60)%60;

            let segundos=Math.floor(diff/1000)%60;

            tempo=`${horas}h ${minutos}m ${segundos}s`;

        }

        cards.innerHTML+=`

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

setInterval(atualizar,1000);
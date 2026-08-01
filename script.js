const cards = document.getElementById("cards");

async function atualizar() {

    const { data, error } = await db
        .from("jobs")
        .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        alert(error.message);
        return;
    }

    alert(`Encontrados ${data.length} elojobs`);
}

atualizar();
setInterval(atualizar, 1000);
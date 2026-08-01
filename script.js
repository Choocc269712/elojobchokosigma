async function testar() {

    const { data, error } = await supabase
        .from("jobs")
        .select("*");

    if (error) {
        console.error(error);
        alert("Erro: " + error.message);
        return;
    }

    console.log(data);
    alert("Conectado com sucesso!");
}

testar();
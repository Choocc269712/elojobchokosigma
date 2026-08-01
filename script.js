async function testar() {
    console.log("Iniciando teste...");

    const { data, error } = await supabase
        .from("jobs")
        .select("*");

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
        alert(error.message);
    } else {
        alert("Conectado! Encontrados " + data.length + " registros.");
    }
}

testar();
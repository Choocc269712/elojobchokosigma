const form=document.getElementById("form");

form.onsubmit=e=>{

e.preventDefault();

let jobs=JSON.parse(localStorage.getItem("jobs"))||[];

let horas=parseInt(document.getElementById("horas").value);

let fim=new Date();

fim.setHours(fim.getHours()+horas);

jobs.push({

boost:document.getElementById("boost").value,

booster:document.getElementById("booster").value,

fim:fim

});

localStorage.setItem("jobs",JSON.stringify(jobs));

location.href="index.html";

}
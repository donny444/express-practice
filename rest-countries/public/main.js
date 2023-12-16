const { response } = require("express");

async function nameSubmit() {
    try {
        const name = document.getElementById("input").value;

        response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        for(i=0; i<response.length; i++) {
            const p = document.createElement("p");
            p.innerHTML = response[i].name.common;
            document.appendChild(p);
        }
    } catch(err) {
        console.error(err);
    }
}
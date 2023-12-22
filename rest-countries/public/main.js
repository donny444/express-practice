document.getElementById("form").addEventListener("submit", nameSubmit);

async function nameSubmit(e) {
    e.preventDefault();
    try {
        const name = document.getElementById("input").value;

        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = response.json();

        for(i=0; i<data.length; i++) {
            const p = document.createElement("p");
            p.innerHTML = data[i].name.common;
            document.body.appendChild(p);
        }
    } catch(err) {
        console.error(err);
    }
}
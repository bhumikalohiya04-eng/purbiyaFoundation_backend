const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if (data.success) {

        alert(data.message);

        window.location.href = "/dashboard.html";

    } else {

        alert(data.message);

    }

});
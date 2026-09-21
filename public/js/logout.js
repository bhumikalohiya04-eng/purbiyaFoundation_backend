    async function logout() {
            const token = localStorage.getItem("token");
            await fetch(
                "http://localhost:5000/logout",
                {
                    method: "POST",
                    headers: {
                        Authorization: token
                    }
                });
            localStorage.removeItem("token");
            alert("Logout Successfully");
            window.location.href = "index.html";
        }
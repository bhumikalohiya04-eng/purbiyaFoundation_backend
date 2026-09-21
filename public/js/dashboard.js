function logout(){
    fetch("/logout", {
        method:"POST"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        window.location.href="/";
    });
}
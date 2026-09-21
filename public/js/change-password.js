document.querySelectorAll(".toggle-password")
.forEach(button => {

    button.addEventListener("click",()=>{

        const input =
        document.getElementById(button.dataset.target);

        if(input.type==="password"){
            input.type="text";
            button.innerHTML =
            '<i class="bi bi-eye-slash"></i>';
        }
        else{
            input.type="password";
            button.innerHTML =
            '<i class="bi bi-eye"></i>';
        }

    });

});



document
.getElementById("changePasswordForm")
.addEventListener("submit", async(e)=>{

    e.preventDefault();


    const oldPassword =
    document.getElementById("oldPassword").value;


    const newPassword =
    document.getElementById("newPassword").value;


    const confirmPassword =
    document.getElementById("confirmPassword").value;



    if(newPassword !== confirmPassword){

        alert("New password and confirm password do not match");
        return;

    }



    const response = await fetch("/change-password",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            oldPassword,
            newPassword

        })

    });


    const data = await response.json();


    alert(data.message);


    if(data.success){

        window.location.href="/dashboard.html";

    }
});
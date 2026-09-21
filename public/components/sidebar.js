// document.addEventListener("DOMContentLoaded", () => {

//     const menuToggle = document.getElementById("menuToggle");
//     const sidebar = document.getElementById("sidebar");

//     menuToggle.addEventListener("click", () => {
//         sidebar.classList.toggle("show");
//     });

//     document.addEventListener("click", (e) => {

//         if (window.innerWidth <= 992) {

//             if (
//                 !sidebar.contains(e.target) &&
//                 !menuToggle.contains(e.target)
//             ) {
//                 sidebar.classList.remove("show");
//             }

//         }

//     });

// });

// document.addEventListener("DOMContentLoaded", async () => {

//     const sidebarContainer = document.getElementById("sidebar-container");

//     const response = await fetch("../public/components/sidebar.html");
//     const sidebarHTML = await response.text();

//     sidebarContainer.innerHTML = sidebarHTML;

//     const menuToggle = document.getElementById("menuToggle");
//     const sidebar = document.getElementById("sidebar");

//     menuToggle.addEventListener("click", () => {
//         sidebar.classList.toggle("show");
//     });

//     document.addEventListener("click", (e) => {

//         if (window.innerWidth <= 992) {

//             if (
//                 !sidebar.contains(e.target) &&
//                 !menuToggle.contains(e.target)
//             ) {
//                 sidebar.classList.remove("show");
//             }

//         }

//     });

// });
document.addEventListener("DOMContentLoaded", async () => {

    const sidebarContainer = document.getElementById("sidebar-container");

    try {
        const response = await fetch("./components/sidebar.html");

        if (!response.ok) {
            throw new Error("Sidebar file not found");
        }

        const sidebarHTML = await response.text();

        sidebarContainer.innerHTML = sidebarHTML;

        const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {

            if (window.innerWidth <= 992) {

                if (
                    !sidebar.contains(e.target) &&
                    !menuToggle.contains(e.target)
                ) {
                    sidebar.classList.remove("show");
                }

            }

        });

    } catch (error) {
        console.error("Sidebar loading error:", error);
    }

});
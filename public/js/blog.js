const form = document.getElementById("blogForm");


form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const formData = new FormData();


    formData.append(
        "image",
        document.getElementById("image").files[0]
    );


    formData.append(
        "title",
        document.getElementById("title").value
    );


    formData.append(
        "category_id",
        document.getElementById("category").value
    );


    formData.append(
        "blog_date",
        document.getElementById("blog_date").value
    );


    formData.append(
        "description",
        document.getElementById("description").value
    );


    const response = await fetch("/blogs", {

        method: "POST",
        body: formData

    });


    const data = await response.json();


    alert(data.message);


});


// display blogs in table
async function loadBlogs() {

    const response = await fetch("/blogs");

    const blogs = await response.json();


    let html = "";


    blogs.forEach((blog, index) => {

        html += `

        <tr>

            <td>${index + 1}</td>

            <td>
                <img src="${blog.image}" 
                class="blog-img">
            </td>

            <td>
                ${blog.title}
            </td>

            <td>
                ${blog.category_name}
            </td>

            <td>
                ${blog.blog_date}
            </td>

            <td>
                <span class="badge bg-success">
                    Published
                </span>
            </td>

            <td>

                <button class="btn btn-warning btn-sm">
                    <i class="bi bi-pencil"></i>
                </button>

                <button 
                onclick="deleteBlog(${blog.id})"
                class="btn btn-danger btn-sm">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });


    document.getElementById("blogTable").innerHTML = html;

}


loadBlogs();


document.getElementById("image").addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const preview = document.getElementById("preview");

        preview.src = URL.createObjectURL(file);

    }

});



async function deleteBlog(id) {

    if (confirm("Delete this blog?")) {


        const response = await fetch(`/blogs/${id}`, {

            method: "DELETE"

        });


        const data = await response.json();


        alert(data.message);


        loadBlogs();

    }

}


async function editBlog(id) {


    const title = prompt("Enter new title");


    if (!title) return;



    await fetch(`/blogs/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },


        body: JSON.stringify({

            title: title

        })

    });


    alert("Updated");


    loadBlogs();
}

document
    .getElementById("searchBlog")
    .addEventListener("keyup", function () {


        let value = this.value.toLowerCase();


        document
            .querySelectorAll("#blogTable tr")
            .forEach(row => {


                row.style.display =
                    row.innerText.toLowerCase()
                        .includes(value)
                        ?
                        ""
                        :
                        "none";


            });


    });


let currentPage = 1;

let perPage = 5;


function showPagination(data) {


    let pages = Math.ceil(data.length / perPage);


    let html = "";


    for (let i = 1; i <= pages; i++) {


        html += `

<button 
class="btn btn-sm btn-primary m-1"
onclick="changePage(${i})">

${i}

</button>


`;

    }


    document
        .getElementById("pagination")
        .innerHTML = html;


}


function changePage(page) {

    currentPage = page;

    loadBlogs();

}
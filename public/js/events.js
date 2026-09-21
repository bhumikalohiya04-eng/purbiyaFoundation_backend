const form=document.getElementById("eventForm");


// Image Preview

document
.getElementById("eventImage")
.addEventListener("change",function(){


const file=this.files[0];


if(file){

let img=document.getElementById("previewImage");

img.src=URL.createObjectURL(file);

img.classList.remove("d-none");

}

});



// Add Event

form.addEventListener("submit",async(e)=>{


e.preventDefault();


let data=new FormData();


data.append(
"image",
document.getElementById("eventImage").files[0]
);


data.append(
"title",
document.getElementById("title").value
);


data.append(
"event_date",
document.getElementById("date").value
);


data.append(
"event_time",
document.getElementById("time").value
);


data.append(
"location",
document.getElementById("location").value
);


data.append(
"description",
document.getElementById("description").value
);



let response=await fetch("/events",{

method:"POST",
body:data

});


let result=await response.json();


alert(result.message);


loadEvents();


form.reset();


});



async function loadEvents(){


let response=await fetch("/events");


let events=await response.json();



let html="";


events.forEach((event,index)=>{


html+=`

<tr>

<td>${index+1}</td>


<td>
<img 
src="${event.image || '/images/default-event.jpg'}"
class="event-image">
</td>


<td>${event.title}</td>


<td>${event.event_date}</td>


<td>${event.event_time}</td>


<td>${event.location}</td>


<td>


<button 
class="btn btn-warning btn-sm">

<i class="bi bi-pencil-fill"></i>

</button>


<button 
onclick="deleteEvent(${event.id})"
class="btn btn-danger btn-sm">

<i class="bi bi-trash-fill"></i>

</button>


</td>


</tr>

`;

});


document.getElementById("eventTable").innerHTML=html;


}


loadEvents();



async function deleteEvent(id){


if(confirm("Delete Event?")){


await fetch(`/events/${id}`,{

method:"DELETE"

});


loadEvents();


}


}


async function editEvent(id){


    let response = await fetch(`/events/${id}`);


    let event = await response.json();



    document.getElementById("title").value =
        event.title;


    document.getElementById("date").value =
        event.event_date;


    document.getElementById("time").value =
        event.event_time;


    document.getElementById("location").value =
        event.location;


    document.getElementById("description").value =
        event.description;



    let img=document.getElementById("previewImage");


    if(event.image){

        img.src=event.image;

        img.classList.remove("d-none");

    }



    // store id for update

    document
    .getElementById("eventForm")
    .dataset.id=id;



    document.querySelector(
        ".card-header h5"
    ).innerHTML="Edit Event";


}
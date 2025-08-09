

let url = 'http://www.omdbapi.com/?apikey=3d954da7&s="avengers"'

let container = document.getElementById("container")

async function getData(){
    try{
        let query = document.getElementById("searchText").value;

        let response = await fetch(`http://www.omdbapi.com/?apikey=3d954da7&s=${query}`);
        let data  = await response.json();
        console.log(data.Search);
        appendToDom(data.Search)

    }
    catch(error){
        console.log(error);
    }
}



function appendToDom(data){

       data.forEach((element)=>{
        let div = document.createElement("div");
    let images = document.createElement("img");
    let pTitle = document.createElement("h2");
    let year = document.createElement("p");

        images.src = element.Poster;
        pTitle.innerText = element.Title;
        year.innerText = element.Year;

        div.append(images,pTitle,year);
        container.append(div);
    })
}
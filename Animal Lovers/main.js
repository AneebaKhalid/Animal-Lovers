async function start() {
    const responseDog = await fetch("https://dog.ceo/api/breeds/list/all")
    const dataDog = await responseDog.json()
    breedListDog(dataDog.message)
}
    
function breedListDog(breedData) {
    document.getElementById("dog").innerHTML = `
    <select onchange="loadBreed(this.value)">
            <option>Choose your Doggy</option>
             
            ${Object.keys(breedData).map(function (breed) {
                return `<option>${breed}</option>`
            }
            )}
        </select>
    `
}
        
async function loadBreed(breed) {
    if (breed != "Choose your doggy") {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        creatSlideshow(data.message)
    }
}

function creatSlideshow(image) {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style = "background-image: url('${image[0]}')">
    </div>`
}


start()

fetch("https://api.thecatapi.com/v1/breeds").then(function (response) {
    return response.json()
}).then(function (data) {
    breedListCat(data)
   
})

async function loadBreedCat(index) {
    const response = await fetch("https://api.thecatapi.com/v1/breeds")
    const data = await response.json()
    let breedSpeed = []
    breedSpeed = data

    for (let i = 0; i < data.length; i++) {
        if (data[i].name == index.value) {
            if (data[i].image) {
                document.getElementById("slideshow").innerHTML = `
                <div class="slide" style = "background-image: url('${data[i].image.url}')">
                </div>`
            }
            else
                console.log("No Image")
        }
        
    }
}

function breedListCat(breedData) {
    let catBreedList = []
    catBreedList = breedData

    document.getElementById("cat").innerHTML = newFunction()
    for (let i = 0; i < catBreedList.length; i++) {
        const breed = catBreedList[i]
        let option = document.createElement('option')
        option.innerHTML = `${breed.name}`
        document.getElementById("breedNames").append(option)
    }

    function newFunction() {
        return `
    <select id="breedNames" onchange="loadBreedCat(this)">
          <option >Choose your Catto</option>
    </select>`
    }
}




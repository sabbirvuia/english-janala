// step 1
const loadLessons =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")   //promise of response
    .then(res => res.json())  //promise of json data 
    .then(jsonData => displayLesson(jsonData.data))

}


// step 3
const loadLessonWord = (id)=>{
    //  console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url).then(res => res.json())
                .then(jsonData => dispalyLevelWord(jsonData.data))

}

// const btnOn = 

// step 4
const dispalyLevelWord = (dataArry)=>{


    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    for(let dataObject of dataArry){


        // console.log(dataObject.word, ":-", dataObject.meaning )

        const card = document.createElement('div');
        card.className = "card bg-white text-black-content w-80"
        card.innerHTML =`
        <div class="card-body items-center text-center space-y-5">
            <h2 class="card-title text-2xl font-bold">${dataObject.word}</h2>
            <p class="text-md font-medium">Meaning /Pronounciation</p>
            <h1 class="text-2xl font-semibold font-bangla">"${dataObject.meaning} / ${dataObject.pronunciation}"</h1>
         <div class="card-actions space-x-35">
            <button class="btn btn-soft btn-info"><img src="./assets/fi-sr-info.png" alt="info of the word"></button>
            <button class="btn btn-soft btn-info"><img src="./assets/fi-sr-volume.png" alt="sound of the word"></button>
         </div>
        </div>
    
        `
        wordContainer.appendChild(card)
    }



}


// step 2
const displayLesson =(lessons)=>{
    // console.log(lessons);
// get the container & empty
const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
// get into every lessons
    for(let lesson of lessons){

    
//    create element
const btnDiv = document.createElement('div');

       btnDiv.className = "btn btn-outline btn-primary";

        btnDiv.setAttribute("onclick", `loadLessonWord(${lesson.level_no}), btnOn()`)

        btnDiv.innerHTML =`<img src="./assets/fa-book-open.png" alt="">Lesson -${lesson.level_no}`

// append int the container by appendChild
        levelContainer.appendChild(btnDiv)
    }
}


loadLessons()
// step 1
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of json data
    .then((jsonData) => displayLesson(jsonData.data));
};
// step 5
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  // console.log(lessonBtn)
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};
// set spinneer

const loadingManager = (status) => {
  if (status === true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

// step 3
const loadLessonWord = (id) => {
  //  console.log(id)
       
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      dispalyLevelWord(jsonData.data);
      // remove all Previous active classes into lesson-btn
      removeActive();

      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");
    });
    loadingManager(true);
};

// step 7
const dispalyWordDetails = (data) => {
  const modalContainer = document.getElementById("modal-container");

  // modal card add details
  modalContainer.innerHTML = `
        <div class="w-full border border-sky-200 p-4 rounded-lg space-y-2">
      <div class="mb-3 space-y-3">
        <h1 class="text-2xl font-bold">
          ${data.word} (<i class="fa-solid fa-microphone-lines"></i
          >:${data.pronunciation})
        </h1>
        <div class="space-y-1">
          <h3 class="text-lg font-semibold">Meaning</h3>
          <p class="text-lg font-bangla font-medium mb-10px">${data.meaning}</p>
          <br />
          <h3 class="text-lg font-semibold">Example</h3>
          <p class="text-lg font-bangla font-medium">${data.sentence}</p>
        </div>
      </div>
      <div>
        <h3 class="text-base font-semibold">সমার্থক শব্দ গুলো</h3>
        <level class="btn bg-sky-200">${data.synonyms[0]}</level>
        <level class="btn bg-sky-200">${data.synonyms[1]}</level>
        <level class="btn bg-sky-200">${data.synonyms[2]}</level>
      </div>
    </div>

    `;

  const modalBox = document.getElementById("my_modal_5");


  modalBox.showModal();
};

// step 6
const showWordDetails = async (id) => {
  // console.log(id)
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();

  // console.log(details);
  dispalyWordDetails(details.data);
};

// step 4
const dispalyLevelWord = (dataArry) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
    
  // step 4
  if (dataArry == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-3 text-center font-bangla space-y-5 p-3">
      <img class="mx-auto" src="./assets/alert-error.png" alt="alart" />
      <p class="text-md text-gray-400 font-medium">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
      <h2 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    loadingManager(false);
    return;
  }

  for (let dataObject of dataArry) {
    // console.log(dataObject.word, ":-", dataObject.meaning )

    const card = document.createElement("div");
    card.className = "card bg-white text-black-content w-80 rounded-xl";
    card.innerHTML = `
        <div class="card-body shadow-sm items-center text-center space-y-4">
      <h2 class="card-title text-2xl font-bold">${dataObject.word}</h2>
      <p class="text-lg font-medium">Meaning /Pronounciation</p>
      <h1 class="text-2xl font-semibold font-bangla">
        "${dataObject.meaning} / ${dataObject.pronunciation}"
      </h1>
      <div class="card-actions space-x-35">
        <button
          onclick="showWordDetails(${dataObject.id})"
          class="btn btn-soft btn-info hover:bg-blue-50 rounded-xl"
        >
          <img src="./assets/fi-sr-info.png" alt="info of the word" />
        </button>
        <button class="btn btn-soft btn-info hover:bg-blue-50 rounded-xl">
          <img src="./assets/fi-sr-volume.png" alt="sound of the word" />
        </button>
      </div>
    </div>

        `;
    wordContainer.appendChild(card);
  }
      loadingManager(false);
};

// step 2
const displayLesson = (lessons) => {
  // console.log(lessons);
  // get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // get into every lessons
  for (let lesson of lessons) {
    //    create element
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary hover:bg-info hover:border-info  lesson-btn ">
        <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no} - ${lesson.lessonName}
        </button>
      `;
    // append int the container by appendChild
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

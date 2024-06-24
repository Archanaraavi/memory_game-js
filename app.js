
let levels = {
    arrayOfEmogiEasy: ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5"],
    arrayOfEmogiMedium: ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8"],
    arrayOfEmogiHard: ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10", "11", "11", "12", "12"]
};

const cards = document.querySelector(".cards");

const resetEle = document.querySelector(".reset");
const hint = document.querySelector(".hint");
const FindPare = document.querySelector(".FindPare");

const Easy = document.querySelector(".Easy");
const Medium = document.querySelector(".Medium");
const Hard = document.querySelector(".Hard");
const Random = document.querySelector(".Random");

let hintUsed = false;
let timerInterval;
const timerElement = document.getElementById("timer");
let time = 0;

const swapArray = (arr) => {
    for (let index = arr.length - 1; index >= 1; index--) {
        const random = Math.floor(Math.random() * (index + 1));
        let temp = arr[index];
        arr[index] = arr[random];
        arr[random] = temp;
    }
    return arr;
};

const inserElemens = (arr) => {
    cards.innerHTML = "";
    arr.forEach(ele => {
        cards.insertAdjacentHTML("beforeend", `
            <div class="card">
                <div class="frant"></div>
                <div class="back">${ele}</div>
            </div>
        `);
    });
};

const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);
};

const reset = () => {
    hintUsed = false;
    time = 0;
    timerElement.textContent = time;
    startTimer();

    let select = document.querySelector(".select").innerHTML;

    if (select === "Easy") {
        cards.style.maxWidth = "40rem";
    } else if (select === "Medium") {
        cards.style.maxWidth = "50rem";
    } else if (select === "Hard") {
        cards.style.maxWidth = "70rem";
    }

    let arr = swapArray(levels[`arrayOfEmogi${select}`]);
    inserElemens(arr);

    const card = document.querySelectorAll(".card");

    card.forEach(ele => {
        ele.addEventListener("click", () => {
            ele.classList.add("open", "sel");
            let sel = document.querySelectorAll(".sel");

            if (sel.length === 2) {
                arr = Array.from(sel);

                if (arr[0].querySelector('.back').innerHTML === arr[1].querySelector('.back').innerHTML) {
                    arr[0].classList.remove("sel");
                    arr[1].classList.remove("sel");
                    arr[0].classList.add("win");
                    arr[1].classList.add("win");
                } else {
                    setTimeout(() => {
                        arr[0].classList.remove("open", "sel");
                        arr[1].classList.remove("open", "sel");
                    }, 800);
                }

                if (document.querySelectorAll(".win").length === card.length) {
                    setTimeout(() => {
                        alert("You Win the Game");
                        reset();
                    }, 1500);
                }
            }
        });
    });
};

resetEle.addEventListener("click", () => {
    reset();
});

hint.addEventListener("click", () => {
    if (hintUsed) {
        alert("Hint already used!");
        return;
    }
    hintUsed = true;
    const card = document.querySelectorAll(".card");
    card.forEach(ele => {
        ele.classList.add('open');
    });

    setTimeout(() => {
        card.forEach(ele => {
            if (!ele.classList.contains("win")) {
                ele.classList.remove('open');
            }
        });
    }, 1000);
});

FindPare.addEventListener("click", () => {
    let selects = document.querySelector(".sel")
    if (selects == undefined) {
        alert("plese open one card first");
        return 0;
    
    }
    let a;
    let se = selects.querySelector(".back").innerHTML.trim();

    let card = document.querySelectorAll(".card");
    card = Array.from(card);

    let temp = [];
    card.forEach(ele => {
        if (!ele.classList.contains("open") && ele.querySelector(".back").innerHTML.trim() === se) {
            a = ele;
        }
    });

    selects.classList.add("win");
    selects.classList.remove("sel");

    a.classList.add("win", "open");
});

Easy.addEventListener("click", () => {
    document.querySelectorAll(".select").forEach(ele => {
        ele.classList.remove('select');
    });
    Easy.classList.add('select');
    reset();
});

Medium.addEventListener("click", () => {
    document.querySelectorAll(".select").forEach(ele => {
        ele.classList.remove('select');
    });
    Medium.classList.add('select');
    reset();
});

Hard.addEventListener("click", () => {
    document.querySelectorAll(".select").forEach(ele => {
        ele.classList.remove('select');
    });
    Hard.classList.add('select');
    reset();
});

Random.addEventListener("click", () => {
    document.querySelectorAll(".select").forEach(ele => {
        ele.classList.remove('select');
    });

    let name = Object.keys(levels)[Math.floor(Math.random() * (Object.keys(levels).length))];

    if (name === "arrayOfEmogiEasy") {
        Easy.classList.add('select');
    } else if (name === "arrayOfEmogiMedium") {
        Medium.classList.add('select');
    } else if (name === "arrayOfEmogiHard") {
        Hard.classList.add('select');
    }

    reset();
});

reset();








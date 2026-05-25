const planets = [
  {
    name: "Mercury",
    distance: "57.9 million km",
    moons: "0",
    temperature: "-173°C to 427°C",
    size: 14,
    orbit: 18,
    speed: 9,
    color: "radial-gradient(circle at 35% 30%, #f3d7a2, #8f8071)",
    description: "Mercury is the smallest planet and the closest planet to the Sun. It has almost no atmosphere, so its temperature changes greatly.",
    facts: ["A year on Mercury is only 88 Earth days.", "It has many craters like our Moon.", "It is a rocky inner planet."]
  },
  {
    name: "Venus",
    distance: "108.2 million km",
    moons: "0",
    temperature: "About 465°C",
    size: 20,
    orbit: 26,
    speed: 13,
    color: "radial-gradient(circle at 35% 30%, #ffe2a3, #d18a34)",
    description: "Venus is the hottest planet because its thick atmosphere traps heat. It is sometimes called Earth's twin because of its similar size.",
    facts: ["Venus rotates very slowly.", "It spins in the opposite direction to most planets.", "Its clouds contain sulfuric acid."]
  },
  {
    name: "Earth",
    distance: "149.6 million km",
    moons: "1",
    temperature: "Average 15°C",
    size: 22,
    orbit: 35,
    speed: 17,
    color: "radial-gradient(circle at 30% 25%, #77e4ff, #1f70ff 50%, #36b36b 70%)",
    description: "Earth is our home planet and the only known planet with life. Liquid water, oxygen, and a protective atmosphere make it special.",
    facts: ["About 71% of Earth's surface is covered by water.", "Earth has one natural satellite, the Moon.", "One Earth year is about 365 days."]
  },
  {
    name: "Mars",
    distance: "227.9 million km",
    moons: "2",
    temperature: "Average -63°C",
    size: 18,
    orbit: 44,
    speed: 21,
    color: "radial-gradient(circle at 35% 30%, #ffb08a, #c7442e)",
    description: "Mars is called the Red Planet because of iron oxide, or rust, in its soil. Scientists study Mars for signs of past water.",
    facts: ["Mars has the largest volcano in the solar system.", "Its moons are Phobos and Deimos.", "Mars has polar ice caps."]
  },
  {
    name: "Jupiter",
    distance: "778.5 million km",
    moons: "95+",
    temperature: "Cloud tops about -110°C",
    size: 42,
    orbit: 56,
    speed: 28,
    color: "linear-gradient(145deg, #fff0c2, #d99d5f 35%, #8c5a3c 55%, #f3d3a2)",
    description: "Jupiter is the largest planet. It is a gas giant with powerful storms, including the famous Great Red Spot.",
    facts: ["Jupiter is more massive than all other planets combined.", "It has faint rings.", "Its Great Red Spot is a giant storm."]
  },
  {
    name: "Saturn",
    distance: "1.43 billion km",
    moons: "146+",
    temperature: "About -140°C",
    size: 38,
    orbit: 68,
    speed: 34,
    color: "radial-gradient(circle at 35% 30%, #fff0ba, #d3a656)",
    description: "Saturn is a gas giant best known for its beautiful rings made of ice, rock, and dust.",
    facts: ["Saturn could float in water if there were a huge enough ocean.", "Its moon Titan has a thick atmosphere.", "Its rings are very wide but thin."]
  },
  {
    name: "Uranus",
    distance: "2.87 billion km",
    moons: "27",
    temperature: "About -195°C",
    size: 30,
    orbit: 80,
    speed: 40,
    color: "radial-gradient(circle at 35% 30%, #b7fff5, #48bcd4)",
    description: "Uranus is an ice giant with a blue-green color. It rotates on its side, making it very unusual.",
    facts: ["Uranus has 13 known rings.", "It was the first planet discovered with a telescope.", "Its seasons last many Earth years."]
  },
  {
    name: "Neptune",
    distance: "4.50 billion km",
    moons: "14",
    temperature: "About -200°C",
    size: 30,
    orbit: 91,
    speed: 47,
    color: "radial-gradient(circle at 35% 30%, #8ec5ff, #274bff)",
    description: "Neptune is the farthest planet from the Sun. It is known for strong winds and deep blue color.",
    facts: ["Neptune has the fastest winds in the solar system.", "Its largest moon is Triton.", "It takes about 165 Earth years to orbit the Sun."]
  }
];

const didYouKnowFacts = [
  ["✦", "The Sun contains more than 99% of the total mass of the solar system."],
  ["☄", "Most asteroids in our solar system are found between Mars and Jupiter."],
  ["◐", "Planets do not make their own light. They reflect sunlight."],
  ["↻", "Every planet rotates and revolves, but at different speeds."]
];

const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars"
  },
  {
    question: "Which planet has the most famous ring system?",
    options: ["Saturn", "Earth", "Neptune", "Mars"],
    answer: "Saturn"
  },
  {
    question: "What force keeps planets moving around the Sun?",
    options: ["Friction", "Gravity", "Magnetism only", "Sound"],
    answer: "Gravity"
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Uranus", "Jupiter", "Venus"],
    answer: "Jupiter"
  },
  {
    question: "Where is the asteroid belt located?",
    options: ["Between Earth and Mars", "Between Mars and Jupiter", "Beyond Neptune", "Inside the Sun"],
    answer: "Between Mars and Jupiter"
  }
];

const solarSystem = document.querySelector(".solar-system");
const modal = document.querySelector("#planetModal");
const modalIcon = document.querySelector("#modalIcon");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalDistance = document.querySelector("#modalDistance");
const modalMoons = document.querySelector("#modalMoons");
const modalTemperature = document.querySelector("#modalTemperature");
const modalFacts = document.querySelector("#modalFacts");

const questionText = document.querySelector("#questionText");
const questionCount = document.querySelector("#questionCount");
const scoreText = document.querySelector("#scoreText");
const optionsBox = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextQuestion");

let currentQuestion = 0;
let score = 0;
let answered = false;
let musicEnabled = false;
let audioContext;

function createSolarSystem() {
  planets.forEach((planet) => {
    const orbit = document.createElement("div");
    orbit.className = "orbit";
    orbit.style.width = `${planet.orbit}%`;
    orbit.style.height = `${planet.orbit}%`;
    orbit.style.animationDuration = `${planet.speed}s`;

    const button = document.createElement("button");
    button.className = "planet";
    button.type = "button";
    button.setAttribute("aria-label", `Open ${planet.name} information`);
    button.dataset.planet = planet.name.toLowerCase();
    button.style.width = `${planet.size}px`;
    button.style.height = `${planet.size}px`;
    button.style.background = planet.color;
    button.style.boxShadow = `0 0 ${planet.size}px rgba(88, 215, 255, 0.45)`;

    if (planet.name === "Saturn") {
      button.style.boxShadow = "0 0 24px rgba(255, 216, 150, 0.65), 0 0 0 8px rgba(237, 205, 131, 0.35)";
    }

    button.addEventListener("click", () => openPlanetModal(planet));
    orbit.appendChild(button);
    solarSystem.appendChild(orbit);
  });
}

function openPlanetModal(planet) {
  modalIcon.style.background = planet.color;
  modalTitle.textContent = planet.name;
  modalDescription.textContent = planet.description;
  modalDistance.textContent = planet.distance;
  modalMoons.textContent = planet.moons;
  modalTemperature.textContent = planet.temperature;
  modalFacts.innerHTML = "";

  planet.facts.forEach((fact) => {
    const item = document.createElement("li");
    item.textContent = fact;
    modalFacts.appendChild(item);
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closePlanetModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function fillFactsAndTable() {
  const factsGrid = document.querySelector("#factsGrid");
  const planetTable = document.querySelector("#planetTable");

  didYouKnowFacts.forEach(([icon, text]) => {
    const card = document.createElement("article");
    card.className = "fact-card glass";
    card.innerHTML = `<span>${icon}</span><p>${text}</p>`;
    factsGrid.appendChild(card);
  });

  planets.forEach((planet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${planet.name}</td>
      <td>${planet.distance}</td>
      <td>${planet.moons}</td>
      <td>${planet.temperature}</td>
    `;
    planetTable.appendChild(row);
  });
}

function loadQuestion() {
  answered = false;
  const item = quizQuestions[currentQuestion];
  questionText.textContent = item.question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  scoreText.textContent = `Score: ${score}`;
  feedback.textContent = "";
  nextButton.classList.remove("show");
  optionsBox.innerHTML = "";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(button, option));
    optionsBox.appendChild(button);
  });
}

function checkAnswer(button, selectedAnswer) {
  if (answered) return;
  answered = true;

  const correctAnswer = quizQuestions[currentQuestion].answer;
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((optionButton) => {
    optionButton.disabled = true;
    if (optionButton.textContent === correctAnswer) {
      optionButton.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score += 1;
    button.classList.add("correct");
    feedback.textContent = "Correct! Excellent space knowledge.";
  } else {
    button.classList.add("incorrect");
    feedback.textContent = `Not quite. The correct answer is ${correctAnswer}.`;
  }

  scoreText.textContent = `Score: ${score}`;
  nextButton.textContent = currentQuestion === quizQuestions.length - 1 ? "Show Result" : "Next Question";
  nextButton.classList.add("show");
}

function moveToNextQuestion() {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion += 1;
    loadQuestion();
    return;
  }

  const percentage = (score / quizQuestions.length) * 100;
  questionCount.textContent = "Quiz Complete";
  scoreText.textContent = `Final Score: ${score}/${quizQuestions.length}`;
  questionText.textContent = percentage >= 80 ? "Outstanding! You are ready for launch." : "Good effort! Review the facts and try again.";
  optionsBox.innerHTML = "";
  feedback.textContent = "Your quiz result is calculated instantly using JavaScript.";
  nextButton.textContent = "Restart Quiz";
  nextButton.classList.add("show");
  nextButton.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  nextButton.onclick = moveToNextQuestion;
  loadQuestion();
}

function startTypingAnimation() {
  const text = "Learn about planets, orbits, gravity, and space facts through a glowing interactive journey.";
  const target = document.querySelector("#typingText");
  let index = 0;

  function typeLetter() {
    target.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      setTimeout(typeLetter, 42);
    }
  }

  typeLetter();
}

function setupSearch() {
  const searchInput = document.querySelector("#planetSearch");
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    document.querySelectorAll(".planet").forEach((planetButton) => {
      const isMatch = value && planetButton.dataset.planet.includes(value);
      planetButton.classList.toggle("search-match", Boolean(isMatch));
    });
  });
}

function setupThemeToggle() {
  const themeButton = document.querySelector("#themeToggle");
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeButton.textContent = document.body.classList.contains("light-mode") ? "☀" : "☾";
  });
}

// Simple Web Audio tones avoid needing external audio files.
function setupMusicToggle() {
  const musicButton = document.querySelector("#musicToggle");
  let oscillator;
  let gain;

  musicButton.addEventListener("click", () => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!musicEnabled) {
      oscillator = audioContext.createOscillator();
      gain = audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 174;
      gain.gain.value = 0.035;
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      musicButton.textContent = "Space Music: On";
      musicEnabled = true;
    } else {
      oscillator.stop();
      musicButton.textContent = "Space Music: Off";
      musicEnabled = false;
    }
  });
}

document.querySelectorAll("[data-close-modal]").forEach((item) => {
  item.addEventListener("click", closePlanetModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePlanetModal();
  }
});

nextButton.addEventListener("click", moveToNextQuestion);

createSolarSystem();
fillFactsAndTable();
loadQuestion();
startTypingAnimation();
setupSearch();
setupThemeToggle();
setupMusicToggle();

const sleep = ms => new Promise(r => setTimeout(r, ms));

function initialize() {
  console.log("initializing")

  const flipButton = document.getElementById("uiFcButtons0").getElementsByTagName("a")[0]
  flipButton.addEventListener("click", addHandwriting, false)
}

async function addHandwriting() {
  await sleep(50)
  console.log("adding stroke order")
  const kanjiSpan = getKanjiContainer()
  const kanji = kanjiSpan.innerText
  console.log("kanji: " + kanji)
  const hwKanji = document.createElement("span")
  hwKanji.style.fontFamily = "KanjiStrokeOrders"
  hwKanji.innerText = kanji

  kanjiSpan.style.fontSize = "0.75em"
  kanjiSpan.appendChild(hwKanji)
}

function getKanjiContainer() {
  const container = document.getElementsByClassName("uiFcHalf d-kanji")[0]
  const span = container.getElementsByClassName("cj-k")[0] 
  return span 
}

const main = document.getElementById("uiFcMain")

const callback = function (mutationsList, observer) {
  observer.disconnect()
  for (const mutation of mutationsList) {
    initialize()
  }
};

const config = {attributes: true, childList: true, subtree: true};
const observer = new MutationObserver(callback);
observer.observe(main, config);

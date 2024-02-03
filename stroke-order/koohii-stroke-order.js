// ==UserScript==
// @name         Kanji Koohii Stroke Order
// @namespace    https://github.com/shintoo/kanji-koohii-scripts
// @version      1.0
// @description  Add stroke order in handwritten font to Kanji Koohii cards during review
// @author       github.com/shintoo
// @match        https://kanji.koohii.com/review*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    function initialize() {
        console.log("initializing")
        const font = new FontFace("StrokeOrderKanji", "url(https://cdn.jsdelivr.net/gh/shintoo/kanji-koohii-scripts@main/stroke-order/KanjiStrokeOrders_v4.004.ttf)")
        
        font.load().then((font) => {
          document.fonts.add(loaded_face)
          const flipButton = document.getElementById("uiFcButtons0").getElementsByTagName("a")[0]
          flipButton.addEventListener("click", addHandwriting, false)
        })
    }

    async function addHandwriting() {
        await sleep(50)
        console.log("adding stroke order")
        const kanjiSpan = getKanjiContainer()
        const kanji = kanjiSpan.innerText
        console.log("kanji: " + kanji)
        const hwKanji = document.createElement("span")
        hwKanji.style.fontFamily = "StrokeOrderKanji"
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
})();

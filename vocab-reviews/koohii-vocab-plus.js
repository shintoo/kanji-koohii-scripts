// ==UserScript==
// @name         Kanji Koohii Vocab Reviews
// @namespace    https://github.com/shintoo/kanji-koohii-scripts
// @version      1.0
// @description  Show only kanji-clozed vocab words first if selected; optionally show definition and keyword before flipping card.
// @author       github.com/shintoo
// @match        https://kanji.koohii.com/review*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function initialize() {
        if (hasVocabWord()) {
            hideKeyword()
            hideVocabDefinition()
            addShowKeywordButton()
        }

        addHideHook()
        addShowHookToFlipButton()
    }

    function hasVocabWord() {
        return document.getElementsByClassName("vyg").length > 0
    }

    function cardFlipped() {
        const flipButton = document.getElementById("uiFcButtons0")
        return window.getComputedStyle(flipButton).display == "none"
    }

    function hideVocabDefinition() {
        document.getElementsByClassName("vyg")[0].style.visibility = "hidden"
    }

    function showVocabDefinition() {
        document.getElementsByClassName("vyg")[0].style.visibility = "visible"
    }

    function hideKeyword() {
        document.getElementsByClassName("JsKeywordLink")[0].style.visibility = "hidden"
    }

    function showKeyword() {
        document.getElementsByClassName("JsKeywordLink")[0].style.visibility = "visible"
    }

    function hideShowKeywordButton() {
        document.getElementById("show-keyword").style.display = "none"
    }

    function showShowKeywordButton() {
        document.getElementById("show-keyword").style.display = "block"
    }

    function addShowHookToFlipButton() {
        const flipButton = document.getElementById("uiFcButtons0")
        flipButton.onclick = () => {
            if (hasVocabWord())
                showVocabDefinition()
            showKeyword()
        }
    }

    function addHideHook() {
        const appElement = document.getElementById("uiFcMain")
        const config = { attributes: false, childList: true, subtree: true };
        const callback = (mutationList, observer) => {
            if (cardFlipped() || !hasVocabWord()) {
                hideShowKeywordButton()
                return
            }
            showShowKeywordButton()
            hideKeyword()
            hideVocabDefinition()
        }

        const observer = new MutationObserver(callback)
        observer.observe(appElement, config)
    }

    function addShowKeywordButton() {
        if (document.getElementById("show-keyword"))
            return

        const buttonsContainer = document.getElementById("uiFcButtons0")

        const showKeywordButton = document.createElement("div")
        showKeywordButton.id = "show-keyword"
        showKeywordButton.style.cursor = "pointer"
        showKeywordButton.style.marginLeft = "0.5em"
        showKeywordButton.classList.add("uiIBtn","uiIBtnDefault","uiFcBtnAF","w-full")

        showKeywordButton.textContent = "Show Keyword"
        showKeywordButton.onclick = function() {
            showKeyword()
            showVocabDefinition()
            hideShowKeywordButton()
        }

        const flex = document.createElement("div")
        flex.style.display = "flex"
        buttonsContainer.appendChild(flex)
        const flipButton = document.getElementById("uiFcButtons0").getElementsByTagName("a")[0]
        flex.appendChild(flipButton)
        flex.appendChild(showKeywordButton)
        buttonsContainer.appendChild(flex)
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

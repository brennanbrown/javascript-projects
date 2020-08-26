(function (window) {
    // Game
    const Game = function (el, option) {
        this.el = document.getElementById(el);
        this.option = option;

        this.info_div = document.createElement("div");
        this.info_div.id = "info_div";

        this.deck_div = document.createElement("div");
        this.deck_div.id = "deck_div";
        this.gameDeck = new Deck(this.deck_div, option);
        this.gameDeck.buildDeck();

        this.el.appendChild(this.info_div);
        this.el.appendChild(this.deck_div);
    };

    const Deck = function (deck_dev, option) {
        this.deckData = option.data;
        this.buildDeck = function () {
            let parentFrag = document.createDocumentFragment();
            // Clears the deck after each use:
            deck_dev.innerHTML = "";
            for (var i = this.deckData.length - 1; i >= 0; i--) {
                var card = new Card();
                // Gives each card a unique ID:
                card.id = "card-" + i;
                card.data = this.deckData[i];
                card.buildCard(parentFrag);
            }
            deck_dev.appendChild(parentFrag);
        }
    };

    const Card = function () {

    }

    const DiscardPile = function () {

    }

    window.Game = Game;
})(window);
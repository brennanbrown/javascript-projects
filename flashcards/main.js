(function (window) {
    const PARENT_FRAG = document.createDocumentFragment();
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

        const shuffleButton = document.createElement("button");
        shuffleButton.innerHTML = "Shuffle";
        shuffleButton.onclick = this.gameDeck.shuffle.bind(this);

        function shuffle() {
            console.log(this);
        }
        shuffle();
        this.info_div.appendChild(shuffleButton);

        this.el.appendChild(this.info_div);
        this.el.appendChild(this.deck_div);
    };

    const Deck = function (deck_div, option) {
        this.deckData = option.data;
        this.buildDeck = function () {

            // Clears the deck after each use:
            deck_div.innerHTML = "";
            for (let i = this.deckData.length - 1; i >= 0; i--) {
                const card = new Card();
                // Gives each card a unique ID:
                card.id = "card-" + i;
                card.data = this.deckData[i];
                card.buildCard(PARENT_FRAG);
            }
            deck_div.appendChild(PARENT_FRAG);
        }
    };

    Deck.prototype.shuffle = function () {
        const cardsToShuffle = this.gameDeck.deckData;
        let remainingCards = cardsToShuffle.length,
            temp,
            i;
        // While there remain elements to shuffle…
        while (remainingCards) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * remainingCards--);
            // And swap it with the current element:
            temp = cardsToShuffle[remainingCards];
            cardsToShuffle[remainingCards] = cardsToShuffle[i];
            cardsToShuffle[i] = temp;
        }
        this.gameDeck.deckData = cardsToShuffle;
        this.gameDeck.buildDeck(this.deck_div)
    };

    const Card = function () {
        // TODO: val, suit and flip()
        this.id = "";
        this.data = "";

        this.cardContainer = document.createElement("div");
        this.cardContainer.className = "card_container";

        this.cardFront = document.createElement("div");
        this.cardFront.className = "card_front";

        this.cardBack = document.createElement("div");
        this.cardBack.className = "card_back";

        this.buildCard = function () {
            let flipDiv = document.createElement("div"),
                frontValDiv = document.createElement("div"),
                backValDiv = document.createElement("div"),
                categoryDiv = document.createElement("div");

            flipDiv.className = "flip";
            frontValDiv.className = "front_val";
            backValDiv.className = "back_val";
            categoryDiv.className = "category_val";

            // Refers to the keys/values from
            // flashcard_QA.json:
            frontValDiv.innerHTML = this.data.q;
            backValDiv.innerHTML = this.data.a;

            categoryDiv.innerHTML = this.data.category;

            this.cardFront.appendChild(frontValDiv);
            this.cardFront.appendChild(categoryDiv);
            this.cardBack.appendChild(backValDiv);

            flipDiv.appendChild(this.cardFront);
            flipDiv.appendChild(this.cardBack);

            this.cardContainer.id = this.id;
            this.cardContainer.appendChild(flipDiv);

            this.cardContainer.onclick = function (e) {
                e.currentTarget.classList.toggle("flip_card");
                e.currentTarget.classList.toggle("slide_over");
            }

            PARENT_FRAG.appendChild(this.cardContainer);
        }
    }

    const DiscardPile = function () {
        // TODO: Holders and AcceptOrReject()
    }

    window.Game = Game;
})(window);
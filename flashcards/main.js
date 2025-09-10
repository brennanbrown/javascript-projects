(function (window) {
  const PARENT_FRAG = document.createDocumentFragment();
  // Game
  const Game = function (el, option) {
    this.el = document.getElementById(el);
    this.option = option;

    this.info_div = document.createElement('div');
    this.info_div.id = 'info_div';

    this.deck_div = document.createElement('div');
    this.deck_div.id = 'deck_div';
    this.gameDeck = new Deck(option);
    this.gameDeck.buildDeck.call(this);

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'JS Flashcards!';
    this.info_div.appendChild(pageTitle);

    const shuffleButton = document.createElement('button');
    shuffleButton.textContent = 'Shuffle';
    shuffleButton.addEventListener('click', this.gameDeck.shuffle.bind(this));
    this.info_div.appendChild(shuffleButton);

    const instructions = function () {
      return alert(
        'Weclome to flashcards!' +
          '\r\nClick the cards to flip over to the answer.' +
          '\r\nWhen you feel confident in a card, place it in the discard pile.'
      );
    };

    const instructionsButton = document.createElement('button');
    instructionsButton.textContent = 'Instructions';
    instructionsButton.addEventListener('click', instructions);
    this.info_div.appendChild(instructionsButton);

    this.rules = {
      discardRow: [
        {
          name: ' Got it! \r\n(Discard Pile)',
          droppable: true,
          maxCards: this.deck_div.children.length,
          piles: 1,
        },
      ],
      gameComplete: function () {
        if (e.currentTarget.childNodes.length === this.discardRow[0].maxCards) {
          console.log('You win!');
        }
      },
    };

    this.buildDiscard = function () {
      for (let i = this.rules.discardRow.length - 1; i >= 0; i--) {
        let zone = document.createElement('div');
        zone.className = 'zone row';
        let discardRule = this.rules.discardRow[i];
        let x = 0;
        while (x < discardRule.piles) {
          let discardObj = new DiscardPile();
          discardObj.name = discardRule.name;
          discardObj.droppable = discardRule.droppable;
          discardObj.id = 'pile-' + x;
          let buildObj = discardObj.init();
          zone.appendChild(buildObj);
          x++;
        }
        this.el.appendChild(zone);
      }
    };

    this.el.appendChild(this.info_div);
    this.el.appendChild(this.deck_div);
    this.buildDiscard();
  };

  const Deck = function (option) {
    this.deckData = option.data;
    this.buildDeck = function () {
      // Clears the deck after each use:
      this.deck_div.innerHTML = '';
      for (let i = this.option.data.length - 1; i >= 0; i--) {
        const card = new Card();
        // Gives each card a unique ID:
        card.id = 'card-' + i;
        card.data = this.option.data[i];
        card.buildCard(PARENT_FRAG);
      }
      this.deck_div.appendChild(PARENT_FRAG);
      this.gameDeck.stack.call(this);
    };
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
    this.gameDeck.buildDeck.call(this);
  };

  Deck.prototype.stack = function () {
    let cards = this.deck_div.children;
    for (let i = cards.length - 1; i >= 0; i--) {
      cards[i].style.top = i + 'px';
      cards[i].style.left = i + 'px';
      cards[i].classList.add('stacked_card');
    }
  };

  const Card = function () {
    this.id = '';
    this.data = '';

    this.cardContainer = document.createElement('div');
    this.cardContainer.className = 'card_container';

    this.cardFront = document.createElement('div');
    this.cardFront.className = 'card_front';

    this.cardBack = document.createElement('div');
    this.cardBack.className = 'card_back';

    this.buildCard = function () {
      let flipDiv = document.createElement('div'),
        frontValDiv = document.createElement('div'),
        backValDiv = document.createElement('div'),
        categoryDiv = document.createElement('div');

      flipDiv.className = 'flip';
      frontValDiv.className = 'front_val';
      backValDiv.className = 'back_val';
      categoryDiv.className = 'category_val';

      // Refers to the keys/values from flashcard_QA.json.
      // The Q/A content contains trusted markup for formatting, so render as HTML.
      frontValDiv.innerHTML = this.data.q;
      backValDiv.innerHTML = this.data.a;

      let learnMore = document.createElement('a');
      learnMore.textContent = 'Learn More!';
      learnMore.href = this.data.link;
      learnMore.target = '_blank';
      learnMore.rel = 'noopener noreferrer';

      let infoImage = document.createElement('img');
      infoImage.src = 'images/info.svg';
      infoImage.alt = '';

      learnMore.appendChild(infoImage);
      learnMore.addEventListener('click', function (e) {
        // Stop the card from flipping over when
        // you open a link in the child container:
        e.stopPropagation();
      });
      backValDiv.appendChild(learnMore);

      categoryDiv.textContent = this.data.category;

      this.cardFront.appendChild(frontValDiv);
      this.cardFront.appendChild(categoryDiv);
      this.cardBack.appendChild(backValDiv);

      flipDiv.appendChild(this.cardFront);
      flipDiv.appendChild(this.cardBack);

      this.cardContainer.id = this.id;
      // Accessibility: allow keyboard focus and semantics
      this.cardContainer.setAttribute('tabindex', '0');
      this.cardContainer.setAttribute('role', 'listitem');
      this.cardContainer.appendChild(flipDiv);

      this.cardContainer.addEventListener('click', cardClick);
      this.cardContainer.draggable = true;
      this.cardContainer.addEventListener('dragstart', cardDrag);
      this.cardContainer.addEventListener('keydown', cardKeydown);

      PARENT_FRAG.appendChild(this.cardContainer);
    };
  };

  const cardClick = (function (e) {
    let counter = 0;
    return function (e) {
      e.currentTarget.classList.toggle('flip_card');
      e.currentTarget.classList.toggle('slide_over');
      e.currentTarget.style.zIndex = counter;
      counter++;
    };
  })();

  function cardDrag(e) {
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
  }

  function getDiscardTarget() {
    // First available drop zone
    return document.querySelector('.holder_target');
  }

  function cardKeydown(e) {
    // Move focused card to discard pile with Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const target = getDiscardTarget();
      if (target) {
        const card = e.currentTarget;
        card.style.top = '0px';
        card.style.left = '0px';
        target.appendChild(card);
      }
    }
  }

  const DiscardPile = function () {
    this.name = '';
    this.droppable;
    this.id = '';
    this.init = function () {
      let holderContainer = document.createElement('div'),
        holderTarget = document.createElement('div'),
        holderLabel = document.createElement('div');

      holderTarget.addEventListener('dragover', function (e) {
        e.preventDefault();
      });
      holderTarget.addEventListener('drop', this.cardDrop);

      holderContainer.className = 'holder_container';
      holderTarget.className = 'holder_target';
      holderTarget.setAttribute('role', 'list');
      holderTarget.setAttribute('aria-label', 'Discard pile drop zone');
      holderLabel.className = 'holder_label';
      holderLabel.innerText = this.name;

      holderContainer.appendChild(holderLabel);
      holderContainer.appendChild(holderTarget);
      return holderContainer;
    };
  };

  DiscardPile.prototype.cardDrop = function (e) {
    // Will get the string for the ID passed in:
    let cardID = e.dataTransfer.getData('text/plain');
    let cardDragging = document.getElementById(cardID);
    cardDragging.style.top = '0px';
    cardDragging.style.left = '0px';
    e.currentTarget.appendChild(cardDragging);
  };

  window.Game = Game;
})(window);

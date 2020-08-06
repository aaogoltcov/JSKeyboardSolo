class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeLeft = container.querySelector('span.status__time');

    this.keyCodeToChar = {
      "65":["A","ф"],"66":["B","и"],"67":["C","с"],"68":["D","в"],"69":["E","у"],"70":["F","а"],
      "71":["G","п"],"72":["H","р"],"73":["I","ш"],"74":["J","о"],"75":["K","л"],"76":["L","д"],
      "77":["M","ь"],"78":["N","т"],"79":["O","щ"],"80":["P","з"],"81":["Q","й"],"82":["R","к"],
      "83":["S","ы"],"84":["T","е"],"85":["U","г"],"86":["V","м"],"87":["W","ц"],"88":["X","ч"],
      "89":["Y","н"],"90":["Z","я"],"186":["Semicolon","ж"],"188":["Comma","б"],"219":["BracketLeft","х"],
      "221":["BracketRight","ъ"],"222":["Quote","э"],"32":[" ", " "],"190":[".", "ю"],"220":["\\","ё"],
    };

    this.reset();

    // Initial game setting
    this.resetGameStatistics();

    // Time render for HTML
    this.timeRender();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  // Initial game setting
  resetGameStatistics() {
    this.wordArray = Array.from(this.wordElement.textContent);
    this.wordIndex = 0;
    this.wordLength = this.wordArray.length;
    this.winsSymbols = 0;
    this.lossSymbols = 0;

    // Time calculation for input
    this.timeLeft.textContent = this.wordLength;
    this.futureTime = Date.now() / 1000 + this.wordLength;
  }

  // Time render for HTML
  timeRender() {
    let that = this;
    setInterval(function () {
      that.timeLeft.textContent = (that.futureTime - Date.now() / 1000).toFixed(0);
      that.timeLeft.textContent == 0 ? that.fail() : '';
    }, 1000);
  };

  // Check input Symbols
  checkSymbol(inputSymbolEN, inputSymbolRU, currentSymbol) {
    if (inputSymbolEN === currentSymbol || inputSymbolRU === currentSymbol) {
      ++this.winsSymbols;
      ++this.wordIndex;
      this.success();
    } else {
      ++this.lossSymbols;
      this.fail();
    };
  };

  // Trace KEYUP event
  registerEvents() {
    document.addEventListener('keyup', event => {
      try {
        this.checkSymbol(this.keyCodeToChar[event.keyCode][0].toLowerCase(),
                        this.keyCodeToChar[event.keyCode][1].toLowerCase(),
                        this.wordArray[this.wordIndex].toLowerCase());
      } catch (TypeError) {
      };
    });
  };

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.resetGameStatistics();
    this.timeRender();
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript',
        'дом',
        'яблоко',
        'желудь',
        'я люблю kitkat'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))


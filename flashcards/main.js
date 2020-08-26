(function (window) {
    // Game
    var Game = function (el, option) {
        this.el = document.getElementById(el);
        this.option = option;
    };
    window.Game = Game;
})(window);
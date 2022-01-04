const memoryGame = {
    tileCount : 20,
    tileOnRow : 5,
    divBoard : null,
    tiles : [],
    tilesChecked : [],
    tilesImg : [
        "images/tile1.png",
        "images/tile2.png",
        "images/tile3.png",
        "images/tile4.png",
        "images/tile5.png",
        "images/tile6.png",
        "images/tile7.png",
        "images/tile8.png",
        "images/tile9.png",
        "images/tile10.png"
    ],
    canClick : true,
    tilePairs : 0,

    tileClick(e) {
        if (this.canClick) {
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = `url(${this.tilesImg[e.target.dataset.cardType]})`;
            }

            if (this.tilesChecked.length === 2) {
                this.canClick = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(() => this.deleteTiles(), 500);
                } else {
                    setTimeout(() => this.resetTiles(), 500);
                }
            }
        }
    },

    deleteTiles() {
        this.tilesChecked.forEach(el => {
            const emptyDiv = document.createElement("div");
            el.after(emptyDiv);
            el.remove();
        });

        this.canClick = true;
        this.tilesChecked = [];

        this.tilePairs++;

        if (this.tilePairs >= this.tileCount / 2) {
            alert("Success!");
            this.startGame();
        }
    },

    resetTiles() {
        this.tilesChecked.forEach(el => el.style.backgroundImage = "");
        this.tilesChecked = [];
        this.canClick = true;
    },

    startGame() {
        this.divBoard = document.querySelector(".board");
        this.divBoard.innerHTML = "";

        this.tiles = [];
        this.tilesChecked = [];
        this.canClick = true;
        this.tilePairs = 0;

        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement("div");
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.addEventListener("click", e => this.tileClick(e));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(".game-reset");
    startBtn.addEventListener("click", e => memoryGame.startGame());
    memoryGame.startGame();
});
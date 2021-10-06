const random = require("./random")

module.exports = class GameManager {
    constructor() {
        this.gameProductionRate = 7;
    }

    setProductionRate(season) {
        switch (season) {
            case "Winter":
                this.gameProductionRate = Math.round(random(10, 14));
                break;
            case "Spring":
                this.gameProductionRate = Math.round(random(6, 8));
                break;
            case "Summer":
                this.gameProductionRate = Math.round(random(4, 6));
                break;
            case "Autumn":
                this.gameProductionRate = Math.round(random(6, 8));
                break;
        }
    }
}
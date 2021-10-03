module.exports = class SeasonManager {
    constructor(){
        this.season = {
                        Winter: {Grass: "#FFFFFF" ,Herbivore : "#F5F5F5" ,Predator : "#000000" ,Human: "#8D6529"},
                        Spring: {Grass: "#25CD27" ,Herbivore : "#F9FF9A" ,Predator : "#A63232" ,Human: "#AB7B33"},
                        Summer: {Grass: "#23BB25" ,Herbivore : "#F4FF4D" ,Predator : "#E74545" ,Human: "#E3A344"},
                        Autumn: {Grass: "#1A921B" ,Herbivore : "#FFE01B" ,Predator : "#F72121" ,Human: "#AB7B33"},
                      }
    }

    giveSeasonColor(season){
        switch (season) {
            case "Winter":
                return this.season.Winter;
            case "Spring":
                return this.season.Spring;
            case "Summer":
                return this.season.Summer;
            case "Autumn":
                return this.season.Autumn;
        }
    }
}
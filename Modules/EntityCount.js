module.exports = class EntityCount {
    constructor(){
        this.count = {
            grassCount: 0,
            herbivoreCount: 0,
            predatorCount: 0,
            stormCount: 0,
            humanCount: 0
        }
    }

    // setCount(amount ,countId){
    //     switch (countId) {
    //         case 1:
    //             this.count.grassCount = amount;
    //         break;
    //         case 2:
    //             this.count.herbivoreCount = amount;
    //         break;
    //         case 3:
    //             this.count.predatorCount = amount;
    //         break;
    //         case 4: 
    //             this.count.stormCount = amount;
    //         break;
    //         case 5:
    //             this.count.humanCount = amount;
    //         break;
    //     }
    // }
}
const random = require("./random");
const Storm = require("./Storm");
const Human = require("./Human");

module.exports = class AllStarter {
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = Math.round(random(1,20));
        if (this.randm == 2){
            let y = Math.round(random(0,matrix.length-1));
            let x = Math.round(random(0,1));
            let left , up;

            if (x == 0){
                x = 0;
                left = 1;
            } else {
                x = matrix.length-1;
                left = 0;
            }

            if (y < matrix.length/2){
                up = 1;
            } else {
                up = 0;
            }

            var storm = new Storm(x,y,up,left);
            stormArr.push(storm);
        } else if (this.randm == 3){
            if (humanArr.length <= 10) {
                let x = Math.round(random(0,matrix.length-1));
                let y = Math.round(random(0,1));

                if (y == 0){
                    y = 0;
                } else {
                    y = matrix.length-1;
                }

                var hum = new Human(x,y);
                humanArr.push(hum);
            }
        }
    }
}
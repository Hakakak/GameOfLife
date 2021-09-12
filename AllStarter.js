class allStarter {  
    constructor (){
        this.randm;
    }

    starterr(){
        this.randm = round(random(1,15));
       
        if (this.randm == 3 || this.randm == 4){
            if (humanArr.length <= 20) {
                let x = round(random(0,matrix.length-1));
                let y = round(random(0,1));

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
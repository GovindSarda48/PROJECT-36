class Food{
    constructor(){
        this.foodStock = 20;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(foodS){
        if(this.foodStock!==0){
            this.foodStock=foodS-1;
        }

        return this.foodStock;
    }
    
   bedroom(){
    image(bedroomIMG,600,600,1200,1200);
  }

  washroom(){
      image(washroomIMG,600,600,1200,1200);
  }
   
  garden(){
    image(gardenIMG,600,600,1200,1200);
  }
    display(){
        var x=80;
        var y=100;

        imageMode(CENTER);
      // image(this.image,550,340,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
             image(this.image,x,y,50,50);
             x=x+50;
            // updateFoodStock(foodStock);

            }
        }
    }
}
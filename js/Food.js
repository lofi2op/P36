class Food{
  constructor(){
      this.image = loadImage("images/Milk.png");
      var foodStockRef;
      var lastFed;
    }

  getFoodStock(){
      database = firebase.database();
      foodStock = database.ref("Food")
      foodStock.on("value",function(data){
        foodStock = data.val();          
      })
    }

    updateFoodStock(foodS){
      database = firebase.database();
      database.ref("/").update({
        Food: foodS
      })
    }

    display(){
    var x=80,y=100;

    if(this.foodStock=20){
      for(var i=0;i<this.foodStock;i++){
         if(i%10==0){
         x=80;
         y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
        }
      }
   }
}
var dog, happyDog, database, foodS, foodStock, fedTime, lastFed;

function preload() {
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1500, 900);

  database = firebase.database();
 
  foodStock = database.ref("Food");
  foodStock.on("value", function(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  })

  dog = createSprite(650, 500, 20, 20);
  dog.addImage(dogImg)

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

}


function draw() {
  background(46, 139, 87);

  database.ref("FeedTime").on("value", function (data) {
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(18);
  if (lastFed >= 12) {
    text("Last Fed : " + lastFed % 12 + " PM ", 700, 60);
  } else if (lastFed == 0) {
    text("Last Fed : 12 AM", 350, 30);
  } else {
    text("Last Fed : " + lastFed + " AM ", 700, 60)
  }


  foodObj.display();

  drawSprites();
}

function feedDog() {
  //foodObj.updateFoodStock(1);
  dog.addImage(dogImg1);

  if (foodObj.getFoodStock() <= 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  }

  //database = firebase.database();
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS++;
  //foodObj.updateFoodStock(20);
  database.ref('/').update({
    Food: foodS
  })
}

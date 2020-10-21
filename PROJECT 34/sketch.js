


var dog,happyDog,foodS,foodStock,database;
var lastFed;
var washroomIMG , gardenIMG ,bedroomIMG; 
var currentTime;
var gameState;
function preload()
{

  washroomIMG = loadImage("WashRoom.png");
  gardenIMG = loadImage("virtual pet images/Garden.png");
  bedroomIMG = loadImage("virtual pet images/Bed Room.png");
  
   dogIMG = loadImage("images/dogImg.png");
  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1200, 1200);
 

  database = firebase.database();
   database.ref('/').update({
    food : 20,
   
  })
  foodObj= new Food();
  foodStock = database.ref('food');
foodStock.on("value",readStock);


  dog = createSprite(650,300,100,100);
  dog.addImage(dogIMG);
  dog.scale =  0.2;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  

  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  
    readState = database.ref("'gameState'");
    readState.on("value" , function(data){
      gameState = data.val();
    })
  

  

}


function draw() {  
  

/*if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogIMG);

}

textSize(20);
fill("white");
stroke("black");
text("FOOD REMAINING :"+foodS,150,180);
textSize(20);
fill("black");
text("PRESS UP ARROW TO FEED THE DOG MILK!",50,100);*/
if(gameState==="hungry"){
  background(46, 139, 87);
    }



foodObj.display(); 

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val(); 
})


if(gameState !==  "hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(dogIMG);
}
drawSprites();

fill(29,84,200);
textSize(25);
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM",325,30);
  console.log(lastFed);
}
else if(lastFed===0){
  text("Last Feed: 12 AM",325,30)
}
else{
  text("Last Feed:" + lastFed + "AM",325,30)

}

/*if(gameState!== "hungry"){
  fooding = createButton("Food");
  fooding.position(700,95);

  fooding.mousePressed(()=>{
    update("hungry");
  })
  }*/

currentTime = hour();
if(currentTime === (lastFed+1)){
  update( "Playing");
  foodObj.garden();
}
else if(currentTime ===(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}

else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
  foodObj.washroom();
}

else{
  update("hungry");
  foodObj.display();
}

}

function readStock(data){
  foodS = data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);

}

/*feed.mousePressed(()=>{
  deductFood(foodS);
})*/


function feedDog(){
  var foodDed = foodObj.deductFood(foodObj.getFoodStock());
  dog.addImage(happyDogIMG);

  database.ref('/').update({
    'food' : foodDed,
    'FeedTime' : hour()
  })
}

function update(state){
  database.ref('/').update({
    gameState : state, 
  })
}
function addFoods(){
  
if(foodS<20){
  foodS++;
  database.ref('/').update({
'food' : foodS


  })
}
}

/* function writeStock(x){

  
 if(x<=0){
    x=0;
  }

  if(x>0){
    x=x-1;
  }

 
  database.ref('/').update({
    'food':x
  })
 
}*/

function showError(){
  console.log("ERROR!");
}




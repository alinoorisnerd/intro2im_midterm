//global variables
// let angle = 0;
let video;
let handPose;
//stores the x,y coordinates and confidence score
let hands = [];
//used for printing onto the screen the special move
let mytitle ; 
let label ;
//handling the sound classifier - I used these documents  https://docs.ml5js.org/#/reference/sound-classifier?id=methods
let classifier;
let soundModel= 'https://teachablemachine.withgoogle.com/models/LHGCWnuCY/';

let songFinished = false;

let virtual_click = false;
let pointerX_pos;
let pointerY_pos;

let waitt = 1000; // for time delay

// containers for the objects:

let bey_me ; 
let bey_opp;

let states = "scene1" // states for the game screen. The states include:
/*
scene1
scene2
scene3
scene4 
scene5 
scene6 
scene7
scene8 
scene9
scene10 
scene11 
scene12 
scene13 
scene14 
scene15 
*/

// background audios
let songs = [];

//variables to store the images
let opponent_bey ;
let player_bey = [];
let scenes = [];


// let circradius;


//pre-load function
function preload(){ 
ml5_preload_function();
// assign the canvas to scene
  for (let i = 1; i<16; i++){
    scenes[i] = loadImage(`assets/scenes/scene${i}.png`);
  }
  opponent_bey = loadImage('assets/blades/opponent.png');
  player_bey [0] = loadImage('assets/blades/dragoon.png');
  player_bey  [1] = loadImage('assets/blades/dragoon1.png');
  // assign audios to songs
  for (let i = 1; i<13; i++){
    songs[i] = loadSound(`assets/audio/audio${i}.mp3`);
  }
  
}


//setup-function

function setup() {
  // angleMode(DEGREES);
  video = createCapture(VIDEO, {flipped:true});
  createCanvas(650, 400);
  video.hide();
//ml5 function called
  ml5_setup_logic();
  // creating new objects
  bey_me = new Beyblade (150,200,60,true);
  bey_opp = new Beyblade (370,200,60,false);

}


function draw() {

 image(video,0,0,650,400);
 
//  all of the scenes handled using the transition and state machines.
  
  switch (states){
    case "scene1" :
      scene1();
      break;
    
    case "scene2" :
      scene2();
      break;
      
    case "scene3" :
      scene3();
      break;
      
    case "scene4" :
      scene4();
      break;
      
    case "scene5" :
      scene5();
      break;
      
    case "scene6" :
      scene6();
      break;
      
    case "scene7" :
      scene7();
      break;
      
    case "scene8" :
      scene8();
      break;
      
    case "scene9" :
      scene9();
      break;
      
    case "scene10" :
      scene10();
      break;
      
    case "scene11" :
      scene11();
      break;
      
    case "scene12" :
      scene12();
      break;
      
    case "scene13" :
      scene13();
      break;
      
    case "scene14" :
      scene14();
      break;
      
    case "scene15" :
      scene15();
      break;
      
    case "scene16" :
      scene16();
      break; 
      
      default:
      
  };
  
  
  
   ml5_draw_logic();
  console.log(mouseX, mouseY , virtual_click, states,);
}

//changing states -----------------------------------------

function scene1(){
  
  image(scenes[1],0,0,650,400);
   
  play_song(1);
  check_clickable (101,185,210,225,"scene4");

  check_clickable (27,246,295,289,"scene2");

  
  
  
}
function scene2(){
  image(scenes[2],0,0,650,400);
    check_clickable (540,308,610,360,"scene3");

}
function scene3(){
  image(scenes[3],0,0,650,400);
      check_clickable (540,26,630,78,"scene1");
 
}
function scene4(){
  stop_song(1);
  image(scenes[4],0,0,650,400);
  setTimeout(()=>{states = "scene5"},waitt);
}
function scene5(){
  image(scenes[5],0,0,650,400);
  
  play_song(3);
  songs[3].onended (()=>{states = "scene6"});
  
}
function scene6(){
image(scenes[6],0,0,650,400);

  play_song(4);
  songs[4].onended (()=>{states = "scene7"});  
}
function scene7(){
  image(scenes[7],0,0,650,400);
  
    play_song(5);
  songs[5].onended (()=>{states = "scene8"});
 
}
function scene8(){


  image(scenes[8],0,0,650,400);

      play_song(2);
  songs[2].onended (()=>{states = "scene9"});
  
}
function scene9(){
  image(scenes[9],0,0,650,400);
    play_song(6);
  songs[6].onended (()=>{states = "scene10"});
}
function scene10(){
  image(scenes[10],0,0,650,400);
  
      play_song(6);
  songs[6].onended (()=>{states = "scene11"});
}
function scene11(){
  image(scenes[11],0,0,650,400);
     play_song(6);
  songs[6].onended (()=>{states = "scene15"});
}
function scene12(){
  image(scenes[12],0,0,650,400);
   play_song(11);

  //  calling the object methods
  
  bey_me.draw_bey();
  bey_me.move_bey();
  bey_opp.draw_bey();
  bey_opp.move_bey();
  bey_opp.bounce_walls();
  bey_me.check_impact(bey_opp);
  bey_me.check_insideStadium();
 
  if (bey_me.special_move == true) 
  {
    play_song(10);
  }     
  
  if ( bey_me.special_move == true){
    fill('limegreen');
    text('Activated', 122, 44);
  } else if ( bey_me.special_move == false) {
    fill('red');
    text('Inactive', 122, 44);
  }
  
  
    if ( bey_me.spin>= 75) { 
    fill('green');
    text(bey_me.spin,114,23);
    } else if ( 75 > bey_me.spin && bey_me.spin >= 20) {
      fill('purple');
      text(bey_me.spin,114,23);
    } else if ( 20 > bey_me.spin) {
      fill ('red');
      text(bey_me.spin,114,23);
    }
  
  text(bey_me.spin,114,23);
  
     if ( bey_opp.spin>= 75) { 
    fill('green');
       text(bey_opp.spin,600,375);
    
    } else if ( 75 > bey_opp.spin && bey_opp.spin >= 20) {
      fill('purple');
       text(bey_opp.spin,600,375);
    } else if (  20 > bey_opp.spin) {
      fill ('red');
       text(bey_opp.spin,600,375);
    }
  
  if ( bey_opp.spin <= 0 ) {
    setTimeout(()=>{states = "scene14" }, waitt);
  } else if (  bey_me.inside_stadium == false || bey_me.spin <= 0) {
             setTimeout(()=>{states = "scene13" }, waitt)  ;
             }
  
}
function scene13(){
  image(scenes[13],0,0,650,400);
   stop_song(11);
  play_song(12);
   check_clickable (524,299,641,383,"scene16", );
}
function scene14(){
  image(scenes[14],0,0,650,400);
  stop_song(11);
  play_song(8);
  check_clickable (524,299,641,383,"scene16");
}
function scene15(){
  image(scenes[15],0,0,650,400);
    play_song(7);
  songs[7].onended (()=>{states = "scene12"});
}

function scene16(){
  image(scenes[1],0,0,650,400);
  window.location.reload();
  
}


// each function is called upon that state being set to.

//---------------------------------------------------------------------




// takes the button parameters and then creates interactivity by drawing a rect on buttons upon hovering. Changes the states upon virtual click when registered.
function check_clickable(x_min,y_min,x_max,y_max, scene_name= states){
  if ( (x_min <= pointerX_pos && pointerX_pos <= x_max) && (y_min <= pointerY_pos && pointerY_pos <= y_max)) {
    fill (0,0,200,100);
    rect (x_min,y_min,(x_max-x_min), (y_max-y_min) );
    if(virtual_click == true){
      songs[2].play();
      states = scene_name;
      console.log (states);
      
    }
      
      }
   
}

// custom function to avoid audio being replayed when the function loops over.
function play_song(numb) {
  // playing the song only if it's not already playing
  if (!songs[numb].isPlaying()) {
    songs[numb].play();
  }
}

function stop_song(numb) {
  // playing the song only if it's not already playing
    songs[numb].stop();
  
}

//Beyblade class and constructor

class Beyblade{
  constructor (pos1 , pos2 ,size , player=true){
    this.xpos = pos1;
    this.ypos = pos2;
    this.size = size;
    this.spin = 100;
    this.special_move = false;
    this.speedX = 2;
    this.speedY = 1;
    this.inside_stadium = true;
    this.stadium_centerX = 316;
    this.stadium_centerY = 200;
    this.centerx = (pos1+size)/2;
    this.centery = (pos2+size)/2;
    this.isPlayer = player;
    this.angle = 0;
  }
  
  // drawing the beyblade and logic behind when and where to draw which one.
  draw_bey(){
    if (mytitle === "Activated") {
        this.special_move = true ;
        } 
    
    if (this.special_move ===true & this.isPlayer == true) {
      image (player_bey[0],this.xpos,this.ypos,this.size,this.size);
      
      // rotate (this.angle);
      this.angle = this.angle + this.speed;
    } else if (this.special_move ===false & this.isPlayer == true) {
               image (player_bey[1],this.xpos,this.ypos,this.size,this.size);
                 // rotate (this.angle);
                this.angle = this.angle + this.speed;
               } else {
                  image (opponent_bey,this.xpos,this.ypos,this.size,this.size);
                  // rotate (this.angle);
                this.angle = this.angle - this.speed;
               }
  }
  // moving the beyblade using coordinates and calculating the center of the image.
  move_bey(){
    if (this.isPlayer === true){
      if (virtual_click == true){
        this.xpos = pointerX_pos;
        this.ypos = pointerY_pos;
      }
    } else if (this.isPlayer == false){
      this.xpos = this.xpos + this.speedX;
      this.ypos = this.ypos + this.speedY;
    }
      this.centerx = this.xpos + this.size / 2;
      this.centery = this.ypos + this.size / 2;
  }

  // checks for the impacts and makes sure to manage the spin value.
  
  check_impact(something) {
    if (dist (this.centerx, this.centery, something.centerx, something.centery) <= this.size) {
      if (virtual_click == false){
        if (this.special_move == true) {
          play_song(9);
          this.xpos += 30;
          this.ypos +=30;
          something.spin = something.spin -10;
          something.speedX = -something.speedX;
          something.speedY = -something.speedY;
        } else {
          play_song(9);
          this.xpos += 30;
          this.ypos +=30;
          something.spin = something.spin - 5;
          something.speedX = -something.speedX;
          something.speedY = -something.speedY;
        }
      } else {
        this.xpos += 30;
        this.ypos +=30;
        this.spin = this.spin - 5;
        play_song(9);
        
        
      }
    }
  }
  
  // checking if the player is out of bounds of the stadium.

  check_insideStadium(){
    if (dist (this.stadium_centerX, this.stadium_centerY, this.centerx,  this.centery ) > 200){
      this.inside_stadium = false;
    } else {
      this.inside_stadium = true;
    }
  }
  // bounces the opponent's blade off the walls
  bounce_walls(){
  
   let displ = dist(this.stadium_centerX, this.stadium_centerY, this.centerx, this.centery);
  
  if (displ >= 200) { //  214 is the stadium radius
    this.speedX = -this.speedX + random(-1.5, 1.5); 
    this.speedY = -this.speedY + random(-1.5, 1.5);
    
    // Reverse speed direction
    
    console.log("Beyblade bounced!");
  }
    
  }
  

  
  
 
}














// --------------------------------------------------------------ML5 setup and logic separated to keep the code clean---------------------------------------------

//ml5_preload_function

function ml5_preload_function(){
    //importing the hand pose image classifier from ml5.js library
  handPose = ml5.handPose({flipped:true}); 
  //importing the sound classifier. Doesn't require additional argument.
 classifier =
   ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/LHGCWnuCY/model.json', ()=>{
//     callback function for testing if the sound model is loaded as it wasn't working before.
   console.log ("sound model loaded");
 });
}


// arranges the setup for ml5
function ml5_setup_logic(){
    handPose.detectStart(video,gotHands);
    classifyAudio();

}



//the logic for ml5 which goes into draw function
function ml5_draw_logic(){
  if(hands.length >0){
    let hand = hands[0];
    let index =  hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    fill(255,0,0);
    let d = dist(index.x,index.y,thumb.x,thumb.y);
    if (d <= 20){
      fill (0,0,255);
      virtual_click = true;
    } else if ( d > 20) {
      virtual_click = false;
    }   
    noStroke();
    circle(index.x,index.y, 16);
    circle (thumb.x,thumb.y, 16); 
    // virtual_click=false
    pointerX_pos = (index.x + thumb.x)/2;
    pointerY_pos = (index.y + thumb.y)/2;
  }
  
  

  
  console.log(pointerX_pos);
  console.log(pointerY_pos);
  
  
    if (label == "dragoon_storm") {
    mytitle = "Activated"
    } else{
      mytitle = "Inactive"
    }
    
    console.log(label);

}



function gotHands (results){
  hands = results;
}


function classifyAudio() {
  classifier.classifyStart(gotResults);
}

// call back function which passes the value of most probable sound.
function gotResults(results) {
  // The results are in an array ordered by confidence
  console.log(results);
  label = results[0].label;
}


// used for debugging why AudioClassification not fowrking
// function gotResults(error, results) {
//   if (error) {
//     console.error("Error in sound classification:", error);
//     return;
//   }

//   console.log("Received sound results:", results); // Debugging output

//   // Check if results exist and contain at least one entry
//   if (!results || results.length === 0) {
//     console.warn("No sound classification results received.");
//     return;
//   }

//   // Find the label with the highest confidence
//   let bestResult = results[0];
//   for (let i = 1; i < results.length; i++) {
//     if (results[i].confidence > bestResult.confidence) {
//       bestResult = results[i];
//     }
//   }

//   label = bestResult.label;
//   console.log("Updated label:", label); // Debugging output
// }

// --------------------------------------------------------------ML5 setup and logic separated to keep the code clean---------------------------------------------
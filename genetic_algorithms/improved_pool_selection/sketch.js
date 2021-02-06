let fruits = [
  { name: "melon", score: 7 },
  { name: "mango", score: 5 },
  { name: "blueberry", score: 3 },
  { name: "cherry", score: 1 },
  { name: "apple", score: 1 }
]

let nb_picks = 100000;

function setup() {

  let sum = 0;
  for(let i = 0; i < fruits.length; i++) {
    sum += fruits[i].score;
  }

  for(let i = 0; i < fruits.length; i++) {
    fruits[i].prob = fruits[i].score / sum;
    fruits[i].count = 0
  }

  for(let i = 0; i < nb_picks; i++){
    let fruit = pickOne(fruits);
    fruit.count++;
  }

  display();
}

function pickOne(list){
  let index = 0;
  let r = random(1);
  while(r > 0){
    r = r - list[index].prob;
    index++;
  }
  index--;

  return list[index];
}

function display(){
  let p = createP("")
  disp = "Fruit count for " + nb_picks + " picks:<br><br>";
  for(let i = 0; i < fruits.length; i++) {
    disp += fruits[i].name + ", score: " + fruits[i].score + ", prob: " + fruits[i].prob + ", count: " + fruits[i].count + "<br>"
  }

  p.html(disp)
}

var tree = [];
var leaves = [];

var count = 0;

var angleA;
var angleB;

var divClick;

function setup() {
  createCanvas(400, 400);
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 100);
  var root = new Branch(a, b);

  tree[0] = root;

  angleA = floor(random(6)) + 1;
  angleB = floor(random(6)) + 1;

  divClick = createDiv('Click to grow.');
  divClick.position(10, height + 10);
  divClick.style('font-size', '16px');
  divClick.style('font-family','Ubuntu, sans-serif');
  divClick.style('color',color(51));
}

function mousePressed() {
  for(var i = tree.length-1; i >= 0; i--){
    if(!tree[i].finished){
      tree.push(tree[i].branch(PI/angleA));
      tree.push(tree[i].branch(-PI/angleB));
    }
    tree[i].finished = true;
  }
  count++;

  if(count <= 6){
    leaves = [];
    for(var i = 0; i < tree.length; i++){
      if(!tree[i].finished){
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw() {
  background(51);

  for(var i = 0; i < tree.length; i++){
    tree[i].show();
    //tree[i].jitter();
  }

    if(count <= 6){
      fill(255, 0, 100, 100);
      noStroke();
    for(var i = 0; i < leaves.length; i++){
      ellipse(leaves[i].x, leaves[i].y, 8, 8);
      if(count === 6){
          leaves[i].y += random(0, 2);
      }
    }
  }

}

//https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering

let vals = [9, 3, 2, 7, 5, 4, 8];

function setup(){
  createCanvas(400,300);
}

function draw(){
  background(0);
  console.log(vals);

  //step 1
  let largestI = -1;
  for(let i = 0; i < vals.length-1; i++){
    if(vals[i] < vals[i + 1]){
      largestI = i;
    }
  }

  if(largestI == -1){
    noLoop();
    console.log("finished");
  }

  //step 2
  let largestJ = -1;
  for(let j = 0; j < vals.length; j++){
    if(vals[largestI] < vals[j]){
      largestJ = j;
    }
  }

  //step 3
  swap(vals, largestI, largestJ);

  //step 4
  let endArray = vals.splice(largestI+1);
  endArray.reverse();
  vals = vals.concat(endArray);

  background(0);
  textSize(64);
  let s = '';
  for(let i = 0; i < vals.length; i++){
    s+=vals[i];
  }
  fill(255);
  text(s, 20, height / 2);

}

function swap(a, i, j){
  let tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}

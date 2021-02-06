//statistics cheatsheet
//https://github.com/nature-of-code/NOC-S17-2-Intelligence-Learning/wiki/Glossary:-Statistics#correlation

function euclideanSimilarityScore(val1, val2){
  let distance = 0;
  for(let i = 0; i < titles.length; i++){
    distance += pow(val1[titles[i]] - val2[titles[i]], 2);
  }
  distance = sqrt(distance);

  return { "distance" : distance, "similarityScore" : (1 / (1 + distance)) };
}

function pearsonCoefficient(val1, val2){
  let sum1 = 0;
  let sum2 = 0;
  let sum1sq = 0;
  let sum2sq = 0;
  let pSum = 0;

  let n = 0;
  for(let i = 0; i < titles.length; i++){
    let rating1 = val1[titles[i]];
    let rating2 = val2[titles[i]];
    if(rating1 !== null &&  rating2 !== null){
        sum1 += rating1;
        sum2 += rating2;
        sum1sq += pow(rating1, 2);
        sum2sq += pow(rating2, 2);
        pSum += (rating1 * rating2);
        n++;
    }
  }

  if(n == 0){
    return { "pearson" : 0 };
  }

  //pearson correlation coefficient
  let num = pSum - (sum1 * sum2 / n);
  let den = sqrt((sum1sq - pow(sum1, 2) / n) * (sum2sq - pow(sum2, 2) / n));

  if(den == 0){
    return { "pearson" : 0 };
  }

  return { "pearson" : (num / den) };
}

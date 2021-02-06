function dft(x){
  let X = [];
  const N = x.length;

  for(let k = 0; k < N; k++){
    let re = 0;
    let im = 0;

    for(let n = 0; n < N; n++){
      re += x[n] * cos(TWO_PI*k*n/N);
      im -= x[n] * sin(TWO_PI*k*n/N);
    }
    re = re / N;
    im = im / N;

    let freq = k;
    let ampl = sqrt(re * re + im * im);
    let phase = atan2(im, re);

    X[k] = { re, im, freq, ampl, phase };
  }

  return X;
}

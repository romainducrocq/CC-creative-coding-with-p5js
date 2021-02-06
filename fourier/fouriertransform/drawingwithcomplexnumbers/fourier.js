function Complex(re, im){
  this.re = re;
  this.im = im;

  this.add = function(c){
    this.re += c.re;
    this.im += c.im;
  }

  this.multiply = function(c){
    const re = this.re*c.re - this.im*c.im;
    const im = this.re*c.im + this.im*c.re;
    return new Complex(re, im);
  }
}

function dft(x){
let X = [];
const N = x.length;

for(let k = 0; k < N; k++){
  let sum = new Complex(0, 0);

  for(let n = 0; n < N; n++){
    const c = new Complex(cos(TWO_PI*k*n/N), -sin(TWO_PI*k*n/N));
    sum.add(x[n].multiply(c));
  }
  sum.re = sum.re / N;
  sum.im = sum.im / N;

  let freq = k;
  let ampl = sqrt(sum.re * sum.re + sum.im * sum.im);
  let phase = atan2(sum.im, sum.re);

  X[k] = { re: sum.re, im: sum.im, freq, ampl, phase };
}

return X;
}

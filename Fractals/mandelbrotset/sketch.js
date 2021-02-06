let zoomButton;
let zoomSlider;

let defDiv;

function setup() {
  createCanvas(360, 360);
  pixelDensity(1);

  zoomButton = createButton("ZOOM");
  zoomButton.position(10, height + 10);
  zoomButton.mousePressed(show);

  zoomSlider = createSlider(0.5, 2.5, 1.5, 0.1);
  zoomSlider.position(zoomButton.x + zoomButton.width + 10, zoomButton.y);

  background(51);
  show();

  defDiv = createDiv("<strong>Mandelbrot set</strong>: complex numbers c for which the function <span style=\"color:rgb(255,0,100);\">f<span style=\"font-size:11px;\">c</span>(z) = z² + c</span> does not diverge when iterated from z = 0.", 10, height + 100);
  defDiv.position(10, zoomButton.y + zoomButton.height + 10);
  defDiv.style('font-size', '13px');
  defDiv.style('font-family','Ubuntu, sans-serif');
  defDiv.style('color',color(51));
  defDiv.size(360);
}

function draw() {
}

function show() {
  loadPixels();
  let maxIterations = 100;
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){

      let zoom = 3 - zoomSlider.value();
      let a = map(x, 0, width, -zoom, zoom);
      let b = map(y, 0, height, -zoom, zoom);

      let ca = a;
      let cb = b;

      let z = 0;
      let n;

      for(n = 0; n < maxIterations; n++){
        let realPart = a**2 - b**2;
        let imaginaryPart = 2*a*b;

        a = realPart + ca;
        b = imaginaryPart + cb;

        if(abs(a + b) > 16){
          break;
        }
      }

      let brightness = map(n, 0, maxIterations, 0, 1);
      brightness = map(sqrt(brightness), 0, 1, 0, 255);
      if(n === maxIterations){
        brightness = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

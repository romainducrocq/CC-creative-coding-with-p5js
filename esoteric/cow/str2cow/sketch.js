let divTitle;
let cowInput;
let cowButton;
let cpButton;
let cowDiv;
let str2cowDiv;

function setup() {
  noCanvas();

  divTitle = createDiv('COW : str 2 cow');
  divTitle.position(10, 10);
  divTitle.style('font-size', '24px');
  divTitle.style('font-family','Ubuntu, sans-serif');
  divTitle.style('color',color(51));

  cowInput = createInput("");
  cowInput.position(10,50);
  cowInput.size(400,100);

  cowButton = createButton("MOO");
  cowButton.position(10, cowInput.height + cowInput.y + 10);
  cowButton.style('font-size', '16px');
  cowButton.style('font-family','Ubuntu, sans-serif');
  cowButton.style('color',color(51));
  cowButton.mousePressed(generateProgram);

  cpButton = createButton("COPY");
  cpButton.position(cowButton.x + cowButton.width + 10, cowInput.height + cowInput.y + 10);
  cpButton.style('font-size', '16px');
  cpButton.style('font-family','Ubuntu, sans-serif');
  cpButton.style('color',color(51));
  cpButton.mousePressed(copyToClipboard);

  str2cowDiv = createDiv(
    "<a target='_blank' rel='noopener noreferrer' href='https://romainducrocq.000webhostapp.com/esoteric/cow/cow2str/index.html'>cow 2 str</a>"
  );
  str2cowDiv.position(cpButton.x + cpButton.width + 50, cpButton.y);
  str2cowDiv.style('font-size', '16px');
  str2cowDiv.style('font-family','Ubuntu, sans-serif');
  str2cowDiv.style('color',color(51));
  str2cowDiv.style('word-wrap','break-word');

  cowDiv = createDiv("");
  cowDiv.position(10, cowButton.height + cowButton.y + 10);
  cowDiv.style('font-size', '16px');
  cowDiv.style('font-family','Ubuntu, sans-serif');
  cowDiv.style('color',color(51));
  cowDiv.style('word-wrap','break-word');
}

function draw() {
}

function generateProgram() {
	// initial program: store 8, 16, 32 and 64 in memory positions 1, 2, 3 and 4, current memory position is 5
	var program = "OOOMoOMoOMoOMoOMoOMoOMoOMoOMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmoomOoMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmoomOoMMMmoOMMMMMMmoOMMMMOOMOomOoMoOmoOmoo"

	cowOut = cowInput.value();
	for (var i = 0; i < cowOut.length; i++) {
		// next character, ignore non-ASCII
		var c = cowOut.charCodeAt(i)
		if (c > 127) continue;

		// clear position 5 and 6
		program += "OOOmoOOOOmOo"

		// add bits
		for (var j = 6; j > 3; j--) {
			var mask = 1 << j
			if (c > mask) {
				switch (j) {
					case 6:
						// position 5 = 64
						program += "mOoMMMmoOMMM"
						break
					case 5:
						// position 5 = 32
						program += "mOomOoMMMmoOmoOMMM"
						break
					case 4:
						// position 5 = 16
						program += "mOomOomOoMMMmoOmoOmoOMMM"
						break
				}
				// add position 5 and 6, result in position 6
				program += "MOOMOomoOMoOmOomoo"
				c -= mask
			}
		}

		// add rest to position 6 and print
		program += "moO"
		for (var j = 0; j < c; j++) {
			program += "MoO"
		}
		program += "MoomOo"
	}

	// split in lines with max 66 characters
	var programFormatted = ""
	while (true) {
		if (program.length > 66) {
			programFormatted += program.substring(0, 66)
			programFormatted += "\n"
			program = program.substring(66)
		} else {
			programFormatted += program
			programFormatted += "\n"
			break
		}
	}
  cowDiv.html(programFormatted)
}

function copyToClipboard() {
  const cp = document.createElement('textarea');
  cp.value = cowDiv.html();
  cp.setAttribute('readonly', '');
  cp.style.position = 'absolute';
  cp.style.left = '-9999px';
  document.body.appendChild(cp);
  cp.select();
  document.execCommand('copy');
  document.body.removeChild(cp);
}

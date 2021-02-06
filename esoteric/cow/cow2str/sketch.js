var result = ""

let divTitle;
let cowInput;
let cowButton;
let cpButton;
let cowDiv;
let cow2strDiv;

function setup() {
  noCanvas();

  divTitle = createDiv('COW : cow 2 str');
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
  cowButton.mousePressed(executeProgram);

  cpButton = createButton("COPY");
  cpButton.position(cowButton.x + cowButton.width + 10, cowInput.height + cowInput.y + 10);
  cpButton.style('font-size', '16px');
  cpButton.style('font-family','Ubuntu, sans-serif');
  cpButton.style('color',color(51));
  cpButton.mousePressed(copyToClipboard);

  cow2strDiv = createDiv(
    "<a target='_blank' rel='noopener noreferrer' href='https://romainducrocq.000webhostapp.com/esoteric/cow/str2cow/index.html'>str 2 cow</a>"
  );
  cow2strDiv.position(cpButton.x + cpButton.width + 50, cpButton.y);
  cow2strDiv.style('font-size', '16px');
  cow2strDiv.style('font-family','Ubuntu, sans-serif');
  cow2strDiv.style('color',color(51));
  cow2strDiv.style('word-wrap','break-word');

  cowDiv = createDiv("");
  cowDiv.position(10, cowButton.height + cowButton.y + 10);
  cowDiv.style('font-size', '16px');
  cowDiv.style('font-family','Ubuntu, sans-serif');
  cowDiv.style('color',color(51));
  cowDiv.style('word-wrap','break-word');
}

function draw() {
}

function cowprint(text) {
	result = result + text
}

function newline(text) {
	result = result + "\n"
}

function cowprintChar(code)  {
	cowprint(String.fromCharCode(code))
}

function cowprintNumber(number) {
	cowprint(number)
	newline()
}

function exec(instruction) {
	switch (instruction) {
		// moo
		case 0:
			if (progPos == 0) {
				return false
			} else {
				progPos--  // skip previous command.
				level = 1
				while (level > 0) {
					if (progPos == 0) {
						break
					}
					progPos--
					if (cowProgram[progPos] == 0) {
						level++
					} else if (cowProgram[progPos] == 7) {  // look for MOO
						level--
					}
				}
				if (level != 0) {
					return false
				}
				return exec(cowProgram[progPos])
			}
			break

		// mOo
		case 1:
			if (memPos == 0) {
				return false
			} else {
				memPos--
			}
			break

		// moO
		case 2:
			memPos++
			if (memPos == memory.length) {
				memory.push(0)
			}
			break

		// mOO
		case 3:
			if (memory[memPos] == 3) {
				return false
			} else {
				return exec(memory[memPos])
			}
			break

		// Moo
		case 4:
			if (memory[memPos] != 0) {
				cowprintChar(memory[memPos])
			} else {
				memory[memPos] = Text.charCodeAt(window.prompt("please enter a character"))
			}
			break

		// MOo
		case 5:
			memory[memPos]--
			break

		// MoO
		case 6:
			memory[memPos]++
			break

		// MOO
		case 7:
			if (memory[memPos] == 0) {
				var level = 1
				var prev = 0
				progPos++  // have to skip past next command when looking for next moo.
				if (progPos == cowProgram.length) {
					break
				}
				while (level > 0) {
					prev = cowProgram[progPos]
					progPos++
					if (progPos == cowProgram.length) {
						break
					}
					if (cowProgram[progPos] == 7) {
						level++
					} else {
						if (cowProgram[progPos] == 0) {  // look for moo command.
							level--
							if (prev == 7) {
								level--
							}
						}
					}
				}
				if (level != 0) {
					return false
				}
			}
			break

		// OOO
		case 8:
			memory[memPos] = 0
			break

		// MMM
		case 9:
			if (registerVal == undefined) {
				registerVal = memory[memPos]
			} else {
				memory[memPos] = registerVal
				registerVal = undefined
			}
			break

		// OOM
		case 10:
			cowprintNumber(memory[memPos])
			break

		// oom
		case 11:
			memory[memPos] = parseFloat(window.prompt("please enter a number"))
			break

		// bad stuff
		default:
			return false
	}
	progPos++
	return true
}

function executeProgram() {
	// read program
	result = ""
	var tokens = [ "moo", "mOo", "moO", "mOO", "Moo", "MOo",
		"MoO", "MOO", "OOO", "MMM", "OOM", "oom"]
	cowIn = cowInput.value();
	var token = "   "
	cowProgram = new Array()
	for (var i = 0; i < cowIn.length; i++) {
		token = token.substring(1) + cowIn.charAt(i)
		for (var j = 0; j < tokens.length; j++) {
			if (tokens[j] == token) {
				cowProgram.push(j)
				token = "   "
				break
			}
		}
	}

	// execute
	progPos = 0
	registerVal = undefined
	memory = new Array()
	memPos = 0
	memory.push(0)
	while (progPos != cowProgram.length) {
		if (!exec(cowProgram[progPos])) {
			break
		}
	}
	newline()
	//cowprint("Done.")

  cowDiv.html(result)
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

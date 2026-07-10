let result = "";

// Check if a string is a recognized function name
function IsFunction(str) {
	return functionsArray.includes(str);
}

// Check if a string is a recognized keyword
function IsBoolean(str) {
	return booleanArray.includes(str);
}
function isDigit(char) {
	return char >= '0' && char <= '9';
}

function ifFirstLine(startingLine) {
	if (!(startingLine[2] == '(')) {
		return false;
	}
	if (!(startingLine[startingLine.length - 1] == ')')) {
		return false;
	}
	var conditionString = startingLine.substring(3, startingLine.length - 1);
	console.log(conditionString);
	if (!(conditionString[conditionString.length - 1] == ')')) {
		return false;
	}
	var functionName = "";
	var functionParameter = "";
	for (let i = 0; i < conditionString.length; i++) {
		if (conditionString[i] == "(") {
			functionParameter = conditionString.substring(i + 1, conditionString.length - 1);
			break;
		} else {
			functionName += conditionString[i];
		}
	}
	functionName = functionName + "()";
	if (!IsBoolean(functionName)) {
		return false;
	}
	for (let i = 0; i < functionParameter.length; i++) {
		if (!isDigit(functionParameter[i])) {
			return false;
		}
	}
	return true;
	console.log(functionName);
	console.log(functionParameter);

}

function ifCheck(lines, index) {
	console.log("FIRST INDEX " + index);
	var startingLine = lines[index];
	var valid = true
	if (!ifFirstLine(startingLine)) {
		console.log("First Line Error");
		result = "Line " + (index + 1) + ": if must be formatted 'if (booleanFunction)'";
		valid = false;
		return -1;
	}
	if (lines[index + 1] != "{") {
		console.log("Open Bracket Error");
		result = "Line " + (index + 1) + ": if must be followed by '{' on a new line";
		valid = false;
		return -1;
	}
	index += 2;
	while (lines[index] != "}") {
		console.log("Index:", index);
		if (index >= lines.length) {
			console.log("Closing Bracket Error");
			result = "Line " + (index + 1) + ": if must be ended by '}' on a new line";
			valid = false;
			return -1;
			break;

		}
		if (!IsFunction(lines[index])) {
			console.log("Invalid Function Error");
			console.log("PREINDEX: " + index);
			result = "Line " + (index + 1) + ": Invalid Function " + lines[index];
			console.log(lines);
			console.log(result);
			console.log("POSTINDEX: " + index);
			valid = false;
			return -1;
			break;
		}
		index += 1;
	}


	if (valid == false) {
		return -1;
	} else {
		return index;
	}

}
function loopFirstLine(startingLine) {
	if (!(startingLine[3] == '(')) {
		return false;
	}
	if (!(startingLine[startingLine.length - 1] == ')')) {
		return false;
	}
	var conditionString = startingLine.substring(4, startingLine.length - 1);
	for (let i = 0; i < conditionString.length; i++) {
		if (!isDigit(conditionString[i])) {
			return false;
		}
	}

	return true;

}
function loopCheck(lines, index) {

	var startingLine = lines[index];
	var valid = true
	if (!loopFirstLine(startingLine)) {
		console.log("First Line Error");
		valid = false;
		result = "Line " + (index + 1) + ": for loop must be formatted 'for (integer)'";
		return -1;
	}
	console.log(lines[index + 1]);


	if (lines[index + 1] != "{") {
		console.log("Open Bracket Error");
		valid = false;
		result = "Line " + (index + 1) + ": for loop must be followed by '{' on a new line";
		return -1;
	}
	index += 2;
	while (lines[index] != "}") {
		console.log("Index:", index);
		if (index >= lines.length) {
			result = "Line " + (index + 1) + ": for loop must be ended by '}' on a new line";
			valid = false;
			return -1;

		}
		if (!IsFunction(lines[index])) {
			Number.isInteger
			console.log("Invalid Function Error");
			valid = false;
			result = "Line " + (index + 1) + ": Invalid Function " + lines[index];
			return -1;
		}
		index += 1;
	}


	if (valid == false) {
		return -1;
	} else {
		return index;
	}
}

function RemoveWhitespace(words) {
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i].replace(/\s+/g, '');
	}
	return words
}

function ParseCode(inputText, newResult) {

	result = newResult;

	//true if parser finds an error
	var failed = false;

	//string typed in text area 
	//var inputText = document.getElementById('main').value;

	let words = inputText.split('\n');
	let lines = RemoveWhitespace(words);
	lines = lines.filter(lines => lines !== '');
	console.log(lines);


	for (let i = 0; i < lines.length; i++) {
		let word = lines[i];

		//Check for illegal characters here
		if (word.includes('"')) {
			failed = true;
			result = "Line " + (i + 1) + ": found illegal character '\"'";
			break;
		}
		if (word.includes(',')) {
			failed = true;
			result = "Line " + (i + 1) + ": found illegal character ','";
			break;
		}
		if (word.includes(';')) {
			failed = true;
			result = "Line " + (i + 1) + ": found illegal character '\;'";
			break;
		}

		// Check if word is a recognized function
		if (IsFunction(word)) {

			console.log(`${word} is a recognized function`);
		}
		else if (word.startsWith("if")) {
			console.log("IF STATEMENT");
			if_results = ifCheck(lines, i);
			console.log(if_results);
			if (if_results == -1) {
				failed = true;
				console.log("failed if");
				break;
			} else {

				i = if_results + 1;
				console.log("success if");

			}

		} else if (word.startsWith("for")) {
			console.log("FOR LOOP", i);
			loop_results = loopCheck(lines, i);
			console.log(loop_results);
			if (loop_results == -1) {
				failed = true;
				console.log("failed loop");
				break;
			} else {
				i += loop_results + 1;
				console.log("success loop");
			}

		} else {
			console.log(`${word} is not recognized.`);
			result = "Line " + (i + 1) + ": " + word + " not recognized";
			failed = true;
			break;
		}
	}

	// if (failed) {
	// 	result = "Parsing failed due to syntax errors.";
	// }
	// console.log("result: " + result);
	return result;

}


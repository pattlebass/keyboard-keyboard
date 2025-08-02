export const keyToSemitones = {
	1: 0, // C4
	2: 2, // D4
	3: 4, // E4
	4: 5, // F4
	5: 7, // G4
	6: 9, // A4
	7: 11, // B4
	8: 12, // C5
	9: 14, // D5
	0: 16, // E5
};

export const buttons = [
	document.getElementById("key0"),
	document.getElementById("key1"),
	document.getElementById("key2"),
	document.getElementById("key3"),
	document.getElementById("key4"),
	document.getElementById("key5"),
	document.getElementById("key6"),
	document.getElementById("key7"),
	document.getElementById("key8"),
	document.getElementById("key9"),
];

export function pressKey(i) {
	const key = document.getElementById("key" + i);
	key.classList.add("numpad-key-pressed");
}

export function unpressKey(i) {
	const key = document.getElementById("key" + i);
	key.classList.remove("numpad-key-pressed");
}

export function refreshOctave(base, modifier) {
	const octaveDownIcon = document.getElementById("octave-down-icon");
	const octaveMiddleIcon = document.getElementById("octave-middle-icon");
	const octaveUpIcon = document.getElementById("octave-up-icon");

	if (modifier === 0) {
		octaveDownIcon.classList.remove("selected");
		octaveMiddleIcon.classList.add("selected");
		octaveUpIcon.classList.remove("selected");
	} else if (modifier === 1) {
		octaveDownIcon.classList.remove("selected");
		octaveMiddleIcon.classList.remove("selected");
		octaveUpIcon.classList.add("selected");
	} else if (modifier === -1) {
		octaveDownIcon.classList.add("selected");
		octaveMiddleIcon.classList.remove("selected");
		octaveUpIcon.classList.remove("selected");
	}

	const semitonesToLetter = {
		0: "C",
		1: "C#",
		2: "D",
		3: "D#",
		4: "E",
		5: "F",
		6: "F#",
		7: "G",
		8: "G#",
		9: "A",
		10: "A#",
		11: "B",
	};

	for (const [i, button] of buttons.entries()) {
		const noteLabel = button.querySelector(".numpad-key-note");
		const octave = Math.floor(keyToSemitones[i] / 12) + base + modifier;
		noteLabel.innerText = `${semitonesToLetter[keyToSemitones[i] % 12]}${octave}`;
	}
}

export function loadButtons() {
	for (const [i, button] of buttons.entries()) {
		button.addEventListener("mousedown", pressKey.bind(null, i));
		button.addEventListener("mouseup", unpressKey.bind(null, i));
		button.addEventListener("mouseleave", unpressKey.bind(null, i));
	}
}

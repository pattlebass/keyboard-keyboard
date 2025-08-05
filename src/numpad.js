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

export const buttons =
	typeof document !== "undefined"
		? Array.from({ length: 10 }, (_, i) => document.getElementById(`key${i}`))
		: [];

export function pressKey(i) {
	const key = document.getElementById("key" + i);
	key.classList.add("numpad-key-pressed");
}

export function unpressKey(i) {
	const key = document.getElementById("key" + i);
	key.classList.remove("numpad-key-pressed");
}

export function setSustain(value) {
	const sustainIndicator = document.getElementById("sustain-indicator");
	if (value) {
		sustainIndicator.classList.add("activated");
	} else {
		sustainIndicator.classList.remove("activated");
	}
}

export function refreshOctave(base, semitoneUp) {
	const octaveIndicator = document.getElementById("octave-indicator");

	if (base === 4) {
		octaveIndicator.classList.remove("octave-up", "octave-down");
	} else if (base === 5) {
		octaveIndicator.classList.remove("octave-down");
		octaveIndicator.classList.add("octave-up");
	} else if (base === 3) {
		octaveIndicator.classList.remove("octave-up");
		octaveIndicator.classList.add("octave-down");
	}

	for (const [i, button] of buttons.entries()) {
		const noteLabel = button.querySelector(".numpad-key-note");
		noteLabel.innerText = getKeyLabel(i, base, semitoneUp);
	}
}

export function setSemitoneUp(sharps) {
	const sharpsIndicator = document.getElementById("sharps-indicator");
	if (sharps) {
		sharpsIndicator.classList.add("activated");
	} else {
		sharpsIndicator.classList.remove("activated");
	}
}

export function loadButtons() {
	for (const [i, button] of buttons.entries()) {
		button.addEventListener("mousedown", pressKey.bind(null, i));
		button.addEventListener("mouseup", unpressKey.bind(null, i));
		button.addEventListener("mouseleave", unpressKey.bind(null, i));
	}
}

export function getKeyLabel(key, base, semitoneUp) {
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

	const octave = Math.floor(keyToSemitones[key] / 12) + base;
	const semitone = (keyToSemitones[key] + semitoneUp) % 12;
	const note = semitonesToLetter[semitone];
	return `${note}${octave}`;
}

export function setVolume(step) {
	if (step === 0) {
		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "hidden";
		document.getElementById("volume-icon-line3").style.visibility = "hidden";
	} else if (step === 1) {
		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "visible";
		document.getElementById("volume-icon-line3").style.visibility = "hidden";
	} else if (step === 2) {
		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "visible";
		document.getElementById("volume-icon-line3").style.visibility = "visible";
	}
}

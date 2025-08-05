import { timer, isNumeric } from "./utils.js";
import * as numpad from "./numpad.js";

export const players = [];

export let volume = 1.0;
export let octaveBase = 4;
export let sustain = true;
export let semitoneUp = false;

export function setOctaveBase(value) {
	octaveBase = value;
}

export function setSemitoneUp(value) {
	semitoneUp = value;
}

export function setSustain(value) {
	sustain = value;
}

export function loadPlayers() {
	for (let i = 0; i < 23; i++) {
		players.push(null);
	}

	for (let note = 23; note < 108; note++) {
		// C1 -> C8
		const sampleUrl = `./sounds/note_${note}.mp3`;
		players.push([]);
		players[note].push(getAudioPlayer(sampleUrl));

		// HACK: Wait for cache. Audio() makes a request everytime the src is set.
		setTimeout(() => {
			players[note].push(getAudioPlayer(sampleUrl));
			players[note].push(getAudioPlayer(sampleUrl));
		}, 1000);
	}
}

function getAudioPlayer(sampleUrl) {
	const player = new Audio();
	player.preload = "none";
	player.src = sampleUrl;
	return player;
}

export function playNote(note) {
	let freePlayer;
	let oldestPlayer = players[note][0];
	for (const [i, player] of players[note].entries()) {
		if (player.currentTime == 0 || player.ended) {
			freePlayer = player;
			break;
		}
		if (oldestPlayer.currentTime < player.currentTime) {
			oldestPlayer = player;
		}
	}
	if (freePlayer != null) {
		freePlayer.currentTime = 0;
		freePlayer.play();
	} else {
		oldestPlayer.currentTime = 0;
		oldestPlayer.play();
	}
}

export function playKey(key) {
	const note = 12 * (octaveBase + 1) + numpad.keyToSemitones[key] + semitoneUp;
	playNote(note);
}

export async function playSong(sequence) {
	let ignore = false;

	for (const char of sequence) {
		if (char === "(") {
			ignore = true;
		} else if (char === ")") {
			ignore = false;
		}

		if (ignore) {
			continue;
		}

		if (isNumeric(char)) {
			playKey(Number(char));
		} else if ("- ".includes(char)) {
			await timer(200);
		} else if (char === "\n") {
			await timer(400);
		}
	}
}

export function stopKey(key, fadeDuration = 0.2) {
	const note = 12 * (octaveBase + 1) + numpad.keyToSemitones[key] + semitoneUp;

	const fadeSteps = 20;
	const fadeInterval = (fadeDuration * 1000) / fadeSteps;

	for (const player of players[note]) {
		if (player && !player.paused && player.volume > 0 && player._isFading !== true) {
			player._isFading = true;
			let step = 0;
			const fadeOut = setInterval(() => {
				step++;
				player.volume = volume * (1 - step / fadeSteps);
				if (step >= fadeSteps) {
					clearInterval(fadeOut);
					player.pause();
					player.currentTime = 0;
					player.volume = volume;
					player._isFading = false;
				}
			}, fadeInterval);
		}
	}
}

export function setVolume(value) {
	volume = value;

	for (const notePlayers of players) {
		if (notePlayers != null) {
			for (const player of notePlayers) {
				player.volume = volume;
			}
		}
	}
}

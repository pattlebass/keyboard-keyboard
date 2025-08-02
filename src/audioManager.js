import { timer, isNumeric } from "./utils.js";
import * as numpad from "./numpad.js";

export const players = [];

export let volumePercentage = 100;
export let octaveBase = 4;
export let octaveUp = false;
export let octaveDown = false;

export function setOctaveUp(value) {
	octaveUp = value;
}

export function setOctaveDown(value) {
	octaveDown = value;
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
	const note = 12 * (octaveBase + octaveUp - octaveDown + 1) + numpad.keyToSemitones[key];
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

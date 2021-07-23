export function getClassesPairs(list) {
	let pairs = [];
	for (let i = 0; i < list.length - 1; i++) {
		for (let j = i + 1; j < list.length; j++) {
			pairs.push([list[i], list[j]]);
		}
	}
	return pairs;
}

'use strict';

/*
You are given a 0-indexed array of strings garbage where garbage[i]
represents the assortment of garbage at the ith house. garbage[i] 
consists only of the characters 'M', 'P' and 'G' representing one 
unit of metal, paper and glass garbage respectively. Picking up 
one unit of any type of garbage takes 1 minute.

You are also given a 0-indexed integer array travel where travel[i]
is the number of minutes needed to go from house i to house i + 1.

There are three garbage trucks in the city, each responsible for 
picking up one type of garbage. Each garbage truck starts at house 
0 and must visit each house in order; however, they do not need to 
visit every house.

Only one garbage truck may be used at any given moment. While one 
truck is driving or picking up garbage, the other two trucks cannot
do anything.

Return the minimum number of minutes needed to pick up all the 
garbage.
*/

const garbageCollection = (garbage, travel) => {
	let travelTime = 0
	garbage = garbage.reverse()

	for (const type of ['G', 'P', 'M']) {
		const lastHouseWithGarbage = garbage.findIndex(house => house.includes(type))
		
		if (lastHouseWithGarbage === -1) {
			continue
		}
		travelTime += travel.slice(0, garbage.length - lastHouseWithGarbage - 1).reduce((acc, num) => acc + num, 0);
	}
	return garbage.join('').length + travelTime
}


console.log(garbageCollection(["G", "P", "GP", "GG"], [2, 4, 3]));
console.log(garbageCollection(["MMM", "PGM", "GP"], [3, 10]));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Variable setup
var bike = {
	ident:'bike',
	running: false,
	lastrun: 0,
	time:500,
	units:0,
	dollar:20,
	cost:200,
	ceo:40000,
	hasCEO:false
};
var taxi = {
	ident:'taxi',
	running: false,
	lastrun: 0,
	time:3000,
	units:0,
	dollar:300,
	cost:3600,
	ceo:700000,
	hasCEO:false
};
var bus = {
	ident:'bus',
	running: false,
	lastrun: 0,
	time:6000,
	units:0,
	dollar:6200,
	cost:64800,
	ceo:13000000,
	hasCEO:false
};
var tram = {
	ident:'tram',
	running: false,
	lastrun: 0,
	time:12000,
	units:0,
	dollar:21917500,
	cost:25300000,
	ceo:230000000,
	hasCEO:false
};
var ferry = {
	ident:'ferry',
	running: false,
	lastrun: 0,
	time:24000,
	units:0,
	dollar:5800000,
	cost:20995200,
	ceo:4200000000,
	hasCEO:false
};
var subway = {
	ident:'subway',
	running: false,
	lastrun: 0,
	time:48000,
	units:0,
	dollar:41570496,
	cost:377913600,
	ceo:75000000000,
	hasCEO:false
};
var train = {
	ident:'train',
	running: false,
	lastrun: 0,
	time:96000,
	units:0,
	dollar:748268928,
	cost:6802444800,
	ceo:1400000000000,
	hasCEO:false
};
var planerent = {
	ident:'planerent',
	running: false,
	lastrun: 0,
	time:192000,
	units:0,
	dollar:13468840704,
	cost:122444006400,
	ceo:2000.00,
	hasCEO:false
};
var smplane = {
	ident:'smplane',
	running: false,
	lastrun: 0,
	time:384000,
	units:0,
	dollar:242439132672,
	cost:2203992115200,
	ceo:24500000000000,
	hasCEO:false
};
var mdplane = {
	ident:'mdplane',
	running: false,
	lastrun: 0,
	time:768000,
	units:0,
	dollar:4363904388096,
	cost:39671858073600,
	ceo:8000000000000000,
	hasCEO:false
};
var airliner = {
	ident:'lgplane',
	running: false,
	lastrun: 0,
	time:1536000,
	units:0,
	dollar:78550278985728,
	cost:714093445324800,
	ceo:140000000000000000,
	hasCEO:false
};
var cruiseliner = {
	ident:'lgship',
	running: false,
	lastrun: 0,
	time:3072000,
	units:0,
	dollar:1413905021743104,
	cost:12853682015846400,
	ceo:2600000000000000000,
	hasCEO:false
};
var score = 200;
var mute = false;

browser.alarms.onAlarm.addListener(cycleEnd);
browser.storage.local.get('gamedata',loadGame);
document.getElementById('mute').addEventListener('click',toggleMute);

// Toggle audio muting
function toggleMute() {
	var button = document.getElementById('mute');
	if (mute) {
		button.className = 'off';
		mute = false;
	} else {
		button.className = 'on';
		mute = true;
	}
}

// Automatically save data
window.onmouseout = function(){
	browser.storage.local.set({
		gamedata: {
			bike_units: bike.units,
			taxi_units: taxi.units,
			bus_units: bus.units,
			tram_units: tram.units,
			ferry_units: ferry.units,
			subway_units: subway.units,
			train_units: train.units,
			planerent_units: planerent.units,
			smplane_units: smplane.units,
			mdplane_units: mdplane.units,
			airliner_units: airliner.units,
			cruiseliner_units: cruiseliner.units,
			bike_ceo: bike.hasCEO,
			taxi_ceo: taxi.hasCEO,
			bus_ceo: bus.hasCEO,
			tram_ceo: tram.hasCEO,
			ferry_ceo: ferry.hasCEO,
			subway_ceo: subway.hasCEO,
			train_ceo: train.hasCEO,
			planerent_ceo: planerent.hasCEO,
			smplane_ceo: smplane.hasCEO,
			mdplane_ceo: mdplane.hasCEO,
			airliner_ceo: airliner.hasCEO,
			cruiseliner_ceo: cruiseliner.hasCEO,
			bike_lastrun: bike.lastrun,
			taxi_lastrun: taxi.lastrun,
			bus_lastrun: bus.lastrun,
			tram_lastrun: tram.lastrun,
			ferry_lastrun: ferry.lastrun,
			subway_lastrun: subway.lastrun,
			train_lastrun: train.lastrun,
			planerent_lastrun: planerent.lastrun,
			smplane_lastrun: smplane.lastrun,
			mdplane_lastrun: mdplane.lastrun,
			airliner_lastrun: airliner.lastrun,
			cruiseliner_lastrun: cruiseliner.lastrun,
			score: score,
			lastplayed: Date.now(),
			mute: mute
		}
	})
};

// Handles button clicks
function handleButtons(el) {
	var type = el.target.name;
	var command = el.target.className;
	if (command == 'runButton') {
		if (!mute) {
			document.getElementById('buttonsound').play();
		}
		cycle(type);
	} else if (command == 'upgradeButton') {
		upgrade(type);
	} else if (command == 'hire') {
		hireCEO(type);
	} else if (command == 'showInformation') {
		if (!mute) {
			document.getElementById('buttonsound').play();
		}
		showInfo(type);
		toggleInfo(true);
	} else if (command == 'closeInformation') {
		if (!mute) {
			document.getElementById('buttonsound').play();
		}
		toggleInfo(false);
	} else if (command == 'closeSummary') {
		if (!mute) {
			document.getElementById('buttonsound').play();
		}
		toggleSummary(false);
	}
}

// Generates information screen
function showInfo(type) {
	var item = getUnitType(type);
	var info = document.getElementsByName('info');
	info[0].textContent = document.getElementsByName(item.ident)[1].textContent;
	info[1].textContent = item.units;
	info[2].textContent = minifyNumber(item.dollar);
	if (item.time > 59000) {
		var displayMinutes = 0;
		var displaySeconds = item.time/1000;
		do {
			displaySeconds -= 60;
			displayMinutes += 1;
		} while (displaySeconds > 59);
		info[3].textContent = displayMinutes + 'm ' + displaySeconds + 's';
	} else {
		info[3].textContent = (item.time/1000) + 's';
	}
	info[4].textContent = minifyNumber(item.cost);
	info[5].textContent = minifyNumber(item.ceo);
	if (item.hasCEO) {
		info[6].textContent = 'Yes';
	} else {
		info[6].textContent = 'No';
	}
}

// Toggles information screen
function toggleInfo(show) {
	if (show) {
		document.getElementById('maingame').className = 'hideScreen';
		document.getElementById('information').className = 'showScreen';
	} else {
		document.getElementById('information').className = 'hideScreen';
		document.getElementById('maingame').className = 'showScreen';
	}
}

// Toggles away summary
function toggleSummary(show) {
	if (document.getElementById('loadingScreen')) {
		document.getElementById('loadingScreen').parentElement.removeChild(document.getElementById('loadingScreen'));
	}
	if (show) {
		document.getElementById('maingame').className = 'hideScreen';
		document.getElementById('summary').className = 'showScreen';
	} else {
		document.getElementById('summary').className = 'hideScreen';
		document.getElementById('maingame').className = 'showScreen';
	}
}

// Link data to variable
function getUnitType(type) {
	if (type == 'bike') {
		var item = bike;
	} else if (type == 'taxi') {
		var item = taxi;
	} else if (type == 'bus') {
		var item = bus;
	} else if (type == 'tram') {
		var item = tram;
	} else if (type == 'ferry') {
		var item = ferry;
	} else if (type == 'subway') {
		var item = subway;
	} else if (type == 'train') {
		var item = train;
	} else if (type == 'planerent') {
		var item = planerent;
	} else if (type == 'smplane') {
		var item = smplane;
	} else if (type == 'mdplane') {
		var item = mdplane;
	} else if (type == 'lgplane') {
		var item = airliner;
	} else if (type == 'lgship') {
		var item = cruiseliner;
	}
	return item;
}

// Update the score
function updateScore() {
	if (score > 999999999) {
		document.getElementById('userScore').textContent = minifyNumber(score);
	} else {
		document.getElementById('userScore').textContent = score.toFixed(2);
	}
	statusCheck();
}

// Hire a CEO
function hireCEO(type) {
	var item = getUnitType(type);
	if (score >= item.ceo) {
		if (!mute) {
			document.getElementById('buysound').play();
		}
		score -= item.ceo;
		item.hasCEO = true;
		updateScore();
		cycle(type);
	} else {
		showError();
	}
}

// Run a work cycle
function cycle(type) {
	var item = getUnitType(type);
	item.running = true;
	var progressBar = document.getElementsByName(item.ident)[1];
	var button = document.getElementsByName(item.ident)[2];
	button.disabled = true;
	progressBar.className = 'progressBar done';
	var d = Date.now();
	d += item.time;
	item.lastrun = d;
	browser.alarms.create(item.ident,{when:d});
}

// End of work cycle
function cycleEnd(alarmInfo) {
	var item = getUnitType(alarmInfo.name);
	var progressBar = document.getElementsByName(item.ident)[1];
	var button = document.getElementsByName(item.ident)[2];
	score += (item.dollar * item.units);
	item.running = false;
	updateScore();
	button.disabled = false;
	progressBar.className = 'progressBar';
	if (item.hasCEO) {
		button.disabled = true;
		setTimeout(function(){
			cycle(item.ident)
		},100);
	}
}

// Purchase a unit
function upgrade(type) {
	var item = getUnitType(type);
	if (score >= item.cost) {
		if (!mute) {
			document.getElementById('buysound').play();
		}
		item.units++;
		document.getElementsByName(type)[0].textContent = item.units;
		score -= item.cost;
		item.cost = (item.cost * 1.05).toFixed(2);
		updateScore();
	} else {
		showError();
	}
}

// Setup game
function loadGame(saved) {
	if (saved.gamedata) {
		// Load saved unit data
		bike.units = saved.gamedata.bike_units;
		taxi.units = saved.gamedata.taxi_units;
		bus.units = saved.gamedata.bus_units;
		tram.units = saved.gamedata.tram_units;
		ferry.units = saved.gamedata.ferry_units;
		subway.units = saved.gamedata.subway_units;
		train.units = saved.gamedata.train_units;
		planerent.units = saved.gamedata.planerent_units;
		smplane.units = saved.gamedata.smplane_units;
		mdplane.units = saved.gamedata.mdplane_units;
		airliner.units = saved.gamedata.airliner_units;
		cruiseliner.units = saved.gamedata.cruiseliner_units;
		
		// Load saved CEO data
		bike.hasCEO = saved.gamedata.bike_ceo;
		taxi.hasCEO = saved.gamedata.taxi_ceo;
		bus.hasCEO = saved.gamedata.bus_ceo;
		tram.hasCEO = saved.gamedata.tram_ceo;
		ferry.hasCEO = saved.gamedata.ferry_ceo;
		subway.hasCEO = saved.gamedata.subway_ceo;
		train.hasCEO = saved.gamedata.train_ceo;
		planerent.hasCEO = saved.gamedata.planerent_ceo;
		smplane.hasCEO = saved.gamedata.smplane_ceo;
		mdplane.hasCEO = saved.gamedata.mdplane_ceo;
		airliner.hasCEO = saved.gamedata.airliner_ceo;
		cruiseliner.hasCEO = saved.gamedata.cruiseliner_ceo;
		
		// Load last runs
		bike.lastrun = saved.gamedata.bike_lastrun;
		taxi.lastrun = saved.gamedata.taxi_lastrun;
		bus.lastrun = saved.gamedata.bus_lastrun;
		tram.lastrun = saved.gamedata.tram_lastrun;
		ferry.lastrun = saved.gamedata.ferry_lastrun;
		subway.lastrun = saved.gamedata.subway_lastrun;
		train.lastrun = saved.gamedata.train_lastrun;
		planerent.lastrun = saved.gamedata.planerent_lastrun;
		smplane.lastrun = saved.gamedata.smplane_lastrun;
		mdplane.lastrun = saved.gamedata.mdplane_lastrun;
		airliner.lastrun = saved.gamedata.airliner_lastrun;
		cruiseliner.lastrun = saved.gamedata.cruiseliner_lastrun;
		
		// Load other data
		score = saved.gamedata.score;
		mute = saved.gamedata.mute;
		var dateLeft = saved.gamedata.lastplayed;
	} else {
		browser.storage.local.set({
			gamedata: {
				bike_units: 0,
				taxi_units: 0,
				bus_units: 0,
				tram_units: 0,
				ferry_units: 0,
				subway_units: 0,
				train_units: 0,
				planerent_units: 0,
				smplane_units: 0,
				mdplane_units: 0,
				airliner_units: 0,
				cruiseliner_units: 0,
				bike_ceo: false,
				taxi_ceo: false,
				bus_ceo: false,
				tram_ceo: false,
				ferry_ceo: false,
				subway_ceo: false,
				train_ceo: false,
				planerent_ceo: false,
				smplane_ceo: false,
				mdplane_ceo: false,
				airliner_ceo: false,
				cruiseliner_ceo: false,
				score: 200,
				lastplayed: 1
			}
		});
	}
	
	// Load mute status
	var muteToggle = document.getElementById('mute');
	if (mute) {
		muteToggle.className = 'on';
	} else {
		muteToggle.className = 'off';
	}
	
	// Gather tycoon objects
	var type = [bike,taxi,bus,tram,ferry,subway,train,planerent,smplane,mdplane,airliner,cruiseliner];
	
	// Calculate income while away
	var dateNow = Date.now();
	var dateDiff = dateNow - dateLeft;
	var scoreBefore = score;
	for (i = 0; i < type.length; i++) {
		if (type[i].hasCEO) {
			score += Math.round(dateDiff / (type[i].time + 100)) * type[i].dollar * type[i].units;
		} else {
			if (type[i].lastrun && type[i].lastrun != 0) {
				if ((dateNow - type[i].lastrun) >= type[i].time) {
					score += type[i].dollar;
				} else if (((dateNow - type[i].lastrun) < type[i].time) && ((dateNow - type[i].lastrun) > -type[i].time)) {
					type[i].running = true;
					var progressBar = document.getElementsByName(type[i].ident)[1];
					var button = document.getElementsByName(type[i].ident)[2];
					button.disabled = true;
					progressBar.className = 'progressBar done';
					browser.alarms.create(type[i].ident,{when:type[i].lastrun});
				} else {
					
				}
			}
		}
	}
	var scoreAfter = score;
	var scoreDiff = scoreAfter - scoreBefore;
	
	// Setup unit counters and start work
	for (i = 0; i < type.length; i++) {
		document.getElementsByName(type[i].ident)[0].textContent = type[i].units;
		if (type[i].hasCEO) {
			cycle(type[i].ident);
		}
	}
	
	// Setup current prices
	for (i = 0; i < type.length; i++) {
		for (ii = 0; ii < type[i].units; ii++) {
			type[i].cost = (type[i].cost * 1.05).toFixed(2);
		}
	}
	
	// Display the summary screen (if applicable)
	if (dateDiff > 1800000 && !(dateLeft == 1) && scoreDiff > 0) {
		document.getElementById('summaryAmount').textContent = '$' + scoreDiff.toFixed(2);
		toggleSummary(true);
	} else {	
		toggleSummary(false);
	}
	updateScore();
	document.getElementsByTagName('body')[0].addEventListener('click',handleButtons);
}

// Handle large numbers
function minifyNumber(num) {
	num = parseFloat(num);
	if (num >= 1000000000000000000000000000000) {
		num = (num / 1000000000000000000000000000000).toFixed(3) + 'N';
	} else if (num >= 1000000000000000000000000000) {
		num = (num / 1000000000000000000000000000).toFixed(3) + 'o';
	} else if (num >= 1000000000000000000000000) {
		num = (num / 1000000000000000000000000).toFixed(3) + 'S';
	} else if (num >= 1000000000000000000000) {
		num = (num / 1000000000000000000000).toFixed(3) + 's';
	} else if (num >= 1000000000000000000) {
		num = (num / 1000000000000000000).toFixed(3) + 'Q';
	} else if (num >= 1000000000000000) {
		num = (num / 1000000000000000).toFixed(3) + 'q';
	} else if (num >= 1000000000000) {
		num = (num / 1000000000000).toFixed(3) + 'T';
	} else if (num >= 1000000000) {
		num = (num / 1000000000).toFixed(3) + 'B';
	} else if (num >= 1000000) {
		num = (num / 1000000).toFixed(3) + 'M';
	} else {
		num = num.toFixed(2);
	}
	return num;
}

// Setup button status
function statusCheck() {
	var type = [bike,taxi,bus,tram,ferry,subway,train,planerent,smplane,mdplane,airliner,cruiseliner];
	for (i = 0; i < type.length; i++) {
		if (score >= type[i].cost) {
			document.getElementsByName(type[i].ident)[3].disabled = false;
		} else {
			document.getElementsByName(type[i].ident)[3].disabled = true;
		}
		if (score >= type[i].ceo) {
			document.getElementsByName(type[i].ident)[4].disabled = false;
		} else {
			document.getElementsByName(type[i].ident)[4].disabled = true;
		}
		if (type[i].units > 0 && !(type[i].hasCEO)) {
			document.getElementsByName(type[i].ident)[2].disabled = false;
		} else {
			document.getElementsByName(type[i].ident)[2].disabled = true;
			document.getElementsByName(type[i].ident)[4].disabled = true;
		}
		if (type[i].running) {
			document.getElementsByName(type[i].ident)[2].disabled = true;
		}
	}
}
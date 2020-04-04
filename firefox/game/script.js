/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Variable setup
let data = {
	score: 200,
	bike: {
		ident: 'bike',
		running: false,
		lastrun: 0,
		time: 500,
		units: 0,
		dollar: 20,
		cost: 200,
		ceo: 40000,
        hasCEO: false
	},
	taxi: {
		ident: 'taxi',
		running: false,
		lastrun: 0,
		time: 3000,
		units: 0,
		dollar: 300,
		cost: 3600,
		ceo: 700000,
		hasCEO: false
	},
	bus: {
		ident: 'bus',
		running: false,
		lastrun: 0,
		time: 6000,
		units: 0,
		dollar: 6200,
		cost: 64800,
		ceo: 13000000,
		hasCEO: false
	},
	tram: {
		ident: 'tram',
		running: false,
		lastrun: 0,
		time: 12000,
		units: 0,
		dollar: 21917500,
		cost: 25300000,
		ceo: 230000000,
		hasCEO: false
	},
	ferry: {
		ident: 'ferry',
		running: false,
		lastrun: 0,
		time: 24000,
		units: 0,
		dollar: 5800000,
		cost: 20995200,
		ceo: 4200000000,
		hasCEO: false
	},
	subway: {
		ident: 'subway',
		running: false,
		lastrun: 0,
		time: 48000,
		units: 0,
		dollar: 41570496,
		cost: 377913600,
		ceo: 75000000000,
		hasCEO: false
	},
	train: {
		ident: 'train',
		running: false,
		lastrun: 0,
		time: 96000,
		units: 0,
		dollar: 748268928,
		cost: 6802444800,
		ceo: 1400000000000,
		hasCEO: false
	},
	planerent: {
		ident: 'planerent',
		running: false,
		lastrun: 0,
		time: 192000,
		units: 0,
		dollar: 13468840704,
		cost: 122444006400,
		ceo: 2000.00,
		hasCEO: false
	},
	smplane: {
		ident: 'smplane',
		running: false,
		lastrun: 0,
		time: 384000,
		units: 0,
		dollar: 242439132672,
		cost: 2203992115200,
		ceo: 24500000000000,
		hasCEO: false
	},
	mdplane: {
		ident: 'mdplane',
		running: false,
		lastrun: 0,
		time: 768000,
		units: 0,
		dollar: 4363904388096,
		cost: 39671858073600,
		ceo: 8000000000000000,
		hasCEO: false
	},
	lgplane: {
		ident: 'lgplane',
		running: false,
		lastrun: 0,
		time: 1536000,
		units: 0,
		dollar: 78550278985728,
		cost: 714093445324800,
		ceo: 140000000000000000,
		hasCEO: false
	},
	lgship: {
		ident: 'lgship',
		running: false,
		lastrun: 0,
		time: 3072000,
		units: 0,
		dollar: 1413905021743104,
		cost: 12853682015846400,
		ceo: 2600000000000000000,
		hasCEO: false
	}
};

let setting = {
	mute: false
}

const UI = {
    button: {
        mute: document.getElementById('mute')
    },
    screen: {
        information: {
            window: document.getElementById('information'),
            title: document.getElementById('info-title'),
            owned: document.getElementById('info-owned'),
            profit: document.getElementById('info-profit'),
            length: document.getElementById('info-length'),
            cost: document.getElementById('info-cost'),
            salary: document.getElementById('info-salary'),
            ceo: document.getElementById('info-ceo')
        },
        game: {
            window: document.getElementById('maingame')
        },
        loading: {
            window: document.getElementById('loadingScreen')
        },
        summary: {
            window: document.getElementById('summary'),
            amount: document.getElementById('summary-amount')
        }
    },
    row: {
        bike: document.getElementById('bike'),
        taxi: document.getElementById('taxi'),
        bus: document.getElementById('bus'),
        tram: document.getElementById('tram'),
        ferry: document.getElementById('ferry'),
        subway: document.getElementById('subway'),
        train: document.getElementById('train'),
        planerent: document.getElementById('planerent'),
        smplane: document.getElementById('smplane'),
        mdplane: document.getElementById('mdplane'),
        lgplane: document.getElementById('lgplane'),
        lgship: document.getElementById('lgship')
    },
	text: {
		score: document.getElementById('userScore')
	}
};

browser.alarms.onAlarm.addListener(cycleEnd);
browser.storage.local.get('gamedata', loadGame);
UI.button.mute.addEventListener('click', toggleMute);

/**
 * Toggles game audio setting
 */
function toggleMute() {
    if (setting.mute) {
        UI.button.mute.className = 'off';
        setting.mute = false;
    } else {
        UI.button.mute.className = 'on';
        setting.mute = true;
    }
}

/**
 * Save game stats to browser storage
 */
function save() {
	browser.storage.local.set({
        gamedata: {
            bike_units: data.bike.units,
            taxi_units: data.taxi.units,
            bus_units: data.bus.units,
            tram_units: data.tram.units,
            ferry_units: data.ferry.units,
            subway_units: data.subway.units,
            train_units: data.train.units,
            planerent_units: data.planerent.units,
            smplane_units: data.smplane.units,
            mdplane_units: data.mdplane.units,
            airliner_units: data.lgplane.units,
            cruiseliner_units: data.lgship.units,
            bike_ceo: data.bike.hasCEO,
            taxi_ceo: data.taxi.hasCEO,
            bus_ceo: data.bus.hasCEO,
            tram_ceo: data.tram.hasCEO,
            ferry_ceo: data.ferry.hasCEO,
            subway_ceo: data.subway.hasCEO,
            train_ceo: data.train.hasCEO,
            planerent_ceo: data.planerent.hasCEO,
            smplane_ceo: data.smplane.hasCEO,
            mdplane_ceo: data.mdplane.hasCEO,
            airliner_ceo: data.lgplane.hasCEO,
            cruiseliner_ceo: data.lgship.hasCEO,
            bike_lastrun: data.bike.lastrun,
            taxi_lastrun: data.taxi.lastrun,
            bus_lastrun: data.bus.lastrun,
            tram_lastrun: data.tram.lastrun,
            ferry_lastrun: data.ferry.lastrun,
            subway_lastrun: data.subway.lastrun,
            train_lastrun: data.train.lastrun,
            planerent_lastrun: data.planerent.lastrun,
            smplane_lastrun: data.smplane.lastrun,
            mdplane_lastrun: data.mdplane.lastrun,
            airliner_lastrun: data.lgplane.lastrun,
            cruiseliner_lastrun: data.lgship.lastrun,
            score: data.score,
            lastplayed: Date.now(),
            mute: setting.mute
        }
    });
}

/**
 * Handle button clicks
 * @param {EventTarget} el 
 */
function handleButtons(el) {
    const type = el.target.parentNode.parentNode.id;
    switch (el.target.className) {

        case 'work':
            playSound('button');
            cycle(type);
            break;

        case 'buy':
            upgrade(type);
            break;

        case 'hire':
            hireCEO(type);
            break;

        case 'info':
            playSound('button');
            showInfo(type);
            toggleInfo(true);
            break;

        case 'closeInformation':
            playSound('button');
            toggleInfo(false);
            break;

        case 'closeSummary':
            playSound('button');
            toggleSummary(false);
            break;
	}
	
	save();
}

/**
 * Play sound
 * @param {string} sound 
 */
function playSound(sound) {
    if (!setting.mute) {
        const audio = document.getElementById('sound-' + sound);
        audio.currentTime = 0;
        audio.play();
    }
}

/**
 * Create information screen
 * @param {string} type 
 */
function showInfo(type) {
    const vehicle = data[type];

    UI.screen.information.title.textContent = UI.row[vehicle.ident].getElementsByClassName('bar')[0].textContent;
    UI.screen.information.owned.textContent = vehicle.units;
    UI.screen.information.profit.textContent = minifyNumber(vehicle.dollar);

    if (vehicle.time > 59000) {
        let displayMinutes = 0;
        let displaySeconds = vehicle.time / 1000;

        do {
            displaySeconds -= 60;
            displayMinutes += 1;
        } while (displaySeconds > 59);

        UI.screen.information.length.textContent = displayMinutes + 'm ' + displaySeconds + 's';
    } else {
        UI.screen.information.length.textContent = (vehicle.time / 1000) + 's';
    }

    UI.screen.information.cost.textContent = minifyNumber(vehicle.cost);
    UI.screen.information.salary.textContent = minifyNumber(vehicle.ceo);

    if (vehicle.hasCEO) {
        UI.screen.information.ceo.textContent = 'Yes';
    } else {
        UI.screen.information.ceo.textContent = 'No';
    }
}

/**
 * Shows/hides the information screen
 * @param {boolean} show 
 */
function toggleInfo(show) {
    if (show) {
        UI.screen.information.window.classList.remove('hide');
        UI.screen.game.window.classList.add('hide');
    } else {
        UI.screen.information.window.classList.add('hide');
        UI.screen.game.window.classList.remove('hide');
    }
}

/**
 * Show/hide the game boot summary
 * @param {boolean} show 
 */
function toggleSummary(show) {
    UI.screen.loading.window.classList.add('hide');

    if (show) {
        UI.screen.summary.window.classList.remove('hide');
        UI.screen.game.window.classList.add('hide');
    } else {
        UI.screen.summary.window.classList.add('hide');
        UI.screen.game.window.classList.remove('hide');
    }
}

/**
 * Update the score
 */
function updateScore() {
    if (data.score > 999999999) {
        UI.text.score.textContent = minifyNumber(data.score);
    } else {
        UI.text.score.textContent = data.score.toFixed(2);
	}
	
    statusCheck();
}

/**
 * Hire a CEO
 * @param {string} type 
 */
function hireCEO(type) {
	const vehicle = data[type];
	
    if (data.score >= vehicle.ceo) {
        data.score -= vehicle.ceo;
		vehicle.hasCEO = true;
		playSound('buy');
        updateScore();
        cycle(type);
    } else {
        showError();
    }
}

/**
 * Start a work cycle
 * @param {string} type 
 */
function cycle(type) {
    const vehicle = data[type];
	const progressBar = UI.row[vehicle.ident].getElementsByClassName('bar')[0];
	const button = UI.row[vehicle.ident].getElementsByClassName('work')[0];
	let currentTime = Date.now();
	
	vehicle.running = true;
	currentTime += vehicle.time;
	vehicle.lastrun = currentTime;

	button.disabled = true;
	startAnimation(progressBar);
    
    browser.alarms.create(vehicle.ident, {
        when: currentTime
	});
	
	save();
}

/**
 * End a work cycle
 * @param {Object} alarmInfo 
 */
function cycleEnd(alarmInfo) {
	const vehicle = data[alarmInfo.name];
	const button = UI.row[vehicle.ident].getElementsByClassName('work')[0];
	
	vehicle.running = false;
	vehicle.lastrun = 0;
    data.score += (vehicle.dollar * vehicle.units);
	updateScore();
	
	button.disabled = false;
	
    if (vehicle.hasCEO) {
		button.disabled = true;
		
        setTimeout(() => {
            cycle(vehicle.ident)
        }, 100);
	}
	
	save();
}

/**
 * Purchase a vehicle
 * @param {string} type 
 */
function upgrade(type) {
	const vehicle = data[type];
	
    if (data.score >= vehicle.cost) {
		data.score -= vehicle.cost;
		vehicle.units++;
		vehicle.cost = (vehicle.cost * 1.05).toFixed(2);

        UI.row[vehicle.ident].getElementsByClassName('count')[0].textContent = vehicle.units;
        
		playSound('buy');
        updateScore();
    } else {
        showError();
    }
}

/**
 * Load game
 * @param {Object} saved 
 */
function loadGame(saved) {
	let dateLeft;

    if (saved.gamedata) {
        // Load saved unit data
        data.bike.units = saved.gamedata.bike_units;
        data.taxi.units = saved.gamedata.taxi_units;
        data.bus.units = saved.gamedata.bus_units;
        data.tram.units = saved.gamedata.tram_units;
        data.ferry.units = saved.gamedata.ferry_units;
        data.subway.units = saved.gamedata.subway_units;
        data.train.units = saved.gamedata.train_units;
        data.planerent.units = saved.gamedata.planerent_units;
        data.smplane.units = saved.gamedata.smplane_units;
        data.mdplane.units = saved.gamedata.mdplane_units;
        data.lgplane.units = saved.gamedata.airliner_units;
        data.lgship.units = saved.gamedata.cruiseliner_units;

        // Load saved CEO data
        data.bike.hasCEO = saved.gamedata.bike_ceo;
        data.taxi.hasCEO = saved.gamedata.taxi_ceo;
        data.bus.hasCEO = saved.gamedata.bus_ceo;
        data.tram.hasCEO = saved.gamedata.tram_ceo;
        data.ferry.hasCEO = saved.gamedata.ferry_ceo;
        data.subway.hasCEO = saved.gamedata.subway_ceo;
        data.train.hasCEO = saved.gamedata.train_ceo;
        data.planerent.hasCEO = saved.gamedata.planerent_ceo;
        data.smplane.hasCEO = saved.gamedata.smplane_ceo;
        data.mdplane.hasCEO = saved.gamedata.mdplane_ceo;
        data.lgplane.hasCEO = saved.gamedata.airliner_ceo;
        data.lgship.hasCEO = saved.gamedata.cruiseliner_ceo;

        // Load last runs
        data.bike.lastrun = saved.gamedata.bike_lastrun;
        data.taxi.lastrun = saved.gamedata.taxi_lastrun;
        data.bus.lastrun = saved.gamedata.bus_lastrun;
        data.tram.lastrun = saved.gamedata.tram_lastrun;
        data.ferry.lastrun = saved.gamedata.ferry_lastrun;
        data.subway.lastrun = saved.gamedata.subway_lastrun;
        data.train.lastrun = saved.gamedata.train_lastrun;
        data.planerent.lastrun = saved.gamedata.planerent_lastrun;
        data.smplane.lastrun = saved.gamedata.smplane_lastrun;
        data.mdplane.lastrun = saved.gamedata.mdplane_lastrun;
        data.lgplane.lastrun = saved.gamedata.airliner_lastrun;
        data.lgship.lastrun = saved.gamedata.cruiseliner_lastrun;

        // Load other data
        data.score = saved.gamedata.score;
        setting.mute = saved.gamedata.mute;
        dateLeft = saved.gamedata.lastplayed;
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
    if (setting.mute) {
        UI.button.mute.className = 'on';
    } else {
        UI.button.mute.className = 'off';
    }

    // Gather tycoon objects
    const vehicle = [
		data.bike,
		data.taxi,
		data.bus,
		data.tram,
		data.ferry,
		data.subway,
		data.train,
		data.planerent,
		data.smplane,
		data.mdplane,
		data.lgplane,
		data.lgship
	];

    // Calculate income while away
    const dateDiff = Date.now() - dateLeft;
	const scoreBefore = data.score;
	
    for (let i = 0; i < vehicle.length; i++) {

		let dateNow = Date.now();
		// Add money earned by automatic processes while away (if there's a CEO)
        if (vehicle[i].hasCEO) {
			if ((dateNow - vehicle[i].lastrun) >= vehicle[i].time) {
				data.score += Math.floor(dateDiff / vehicle[i].time) * vehicle[i].dollar * vehicle[i].units;
				const completed = dateDiff % vehicle[i].time;
				const nextTime = dateNow + vehicle[i].time - completed
				vehicle[i].lastrun = nextTime;
			}
		}

		if (vehicle[i].lastrun && vehicle[i].lastrun != 0) {
			// Handle if the vehicle has been run at all
			

			if ((dateNow - vehicle[i].lastrun) >= vehicle[i].time) {
				// Add completed time if a vehicle run was completed while game was closed
				data.score += vehicle[i].dollar;
			} else if (((dateNow - vehicle[i].lastrun) < vehicle[i].time) && ((dateNow - vehicle[i].lastrun) > -vehicle[i].time)) {
				// Resume the work cycle if the vehicle cycle is still in progress
				const progressBar = UI.row[vehicle[i].ident].getElementsByClassName('bar')[0];
				const button = UI.row[vehicle[i].ident].getElementsByClassName('work')[0];
				
				vehicle[i].running = true;
				
				button.disabled = true;
				const animationDelay = (vehicle[i].lastrun - dateNow - vehicle[i].time) / 1000;
				startDelayedAnimation(progressBar, animationDelay);
				
				browser.alarms.create(vehicle[i].ident, {
					when: vehicle[i].lastrun
				});
			}
		}
	}
	
	// Calculate difference in score
    const scoreDiff = data.score - scoreBefore;

    // Setup unit counters and start work
    for (let i = 0; i < vehicle.length; i++) {
		UI.row[vehicle[i].ident].getElementsByClassName('count')[0].textContent = vehicle[i].units;
    }

    // Setup current prices
    for (let i = 0; i < vehicle.length; i++) {
        for (let ii = 0; ii < vehicle[i].units; ii++) {
            vehicle[i].cost = (vehicle[i].cost * 1.05).toFixed(2);
        }
    }

    // Display the summary screen (if applicable)
    if (dateDiff > 1800000 && !(dateLeft == 1) && scoreDiff > 0) {
        UI.screen.summary.amount.textContent = '$' + scoreDiff.toFixed(2);
        toggleSummary(true);
    } else {
        toggleSummary(false);
	}
	
    updateScore();
    document.body.addEventListener('click', handleButtons);
}

/**
 * Convert large numbers into money text
 * @param {number} num
 * @returns {number} Formatted number
 */
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

/**
 * Enable/Disable buttons (as required)
 */
function statusCheck() {
	const vehicle = [
		data.bike,
		data.taxi,
		data.bus,
		data.tram,
		data.ferry,
		data.subway,
		data.train,
		data.planerent,
		data.smplane,
		data.mdplane,
		data.lgplane,
		data.lgship
	];
	
    for (let i = 0; i < vehicle.length; i++) {
        let button;
        // Check if player can afford to purchase vehicle
        button = UI.row[vehicle[i].ident].getElementsByClassName('buy')[0];
        if (data.score >= vehicle[i].cost) {
            button.disabled = false;
        } else {
            button.disabled = true;
		}
		
        // Check if player can afford a CEO
        button = UI.row[vehicle[i].ident].getElementsByClassName('hire')[0];
        if (data.score >= vehicle[i].ceo) {
            button.disabled = false;
        } else {
            button.disabled = true;
		}
		
		// Check that player doesn't have a CEO already
        // and that they own at least 1 vehicle
        button = UI.row[vehicle[i].ident].getElementsByClassName('work')[0];
        if (vehicle[i].units > 0 && !(vehicle[i].hasCEO)) {
            button.disabled = false;
        } else {
            button.disabled = true;
            UI.row[vehicle[i].ident].getElementsByClassName('hire')[0].disabled = true;
		}
		
		// Check if vehicle cycle is running
        if (vehicle[i].running) {
            button.disabled = true;
        }
    }
}

/**
 * Start progress bar animation from the start
 * @param {HTMLElement} bar 
 */
function startAnimation(bar) {
	bar.classList.remove('play');
	bar.removeAttribute('style');
	void bar.offsetWidth;
	bar.classList.add('play');
}

/**
 * Start progress bar animation with a delay
 * @param {HTMLElement} bar
 * @param {number} delay
 */
function startDelayedAnimation(bar, delay) {
	bar.classList.remove('play');
	bar.setAttribute('style', 'animation-delay: ' + delay + 's;');
	void bar.offsetWidth;
	bar.classList.add('play');
}

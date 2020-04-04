/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Variable setup
let data = {
	score: 200,
	bike: {
		id: 'bike',
		running: false,
		end: 0,
		time: 500,
		units: 0,
		dollar: 20,
		cost: 200,
		ceo: {
            cost: 40000,
            has: false
        }
	},
	taxi: {
		id: 'taxi',
		running: false,
		end: 0,
		time: 3000,
		units: 0,
		dollar: 300,
        cost: 3600,
        ceo: {
            cost: 700000,
            has: false
        }
	},
	bus: {
		id: 'bus',
		running: false,
		end: 0,
		time: 6000,
		units: 0,
		dollar: 6200,
        cost: 64800,
        ceo: {
            cost: 13000000,
            has: false
        }
	},
	tram: {
		id: 'tram',
		running: false,
		end: 0,
		time: 12000,
		units: 0,
		dollar: 21917500,
        cost: 25300000,
        ceo: {
            cost: 230000000,
            has: false
        }
	},
	ferry: {
		id: 'ferry',
		running: false,
		end: 0,
		time: 24000,
		units: 0,
		dollar: 5800000,
        cost: 20995200,
        ceo: {
            cost: 4200000000,
            has: false
        }
	},
	subway: {
		id: 'subway',
		running: false,
		end: 0,
		time: 48000,
		units: 0,
		dollar: 41570496,
        cost: 377913600,
        ceo: {
            cost: 75000000000,
            has: false
        }
	},
	train: {
		id: 'train',
		running: false,
		end: 0,
		time: 96000,
		units: 0,
		dollar: 748268928,
        cost: 6802444800,
        ceo: {
            cost: 1400000000000,
            has: false
        }
	},
	plane_rental: {
		id: 'plane_rental',
		running: false,
		end: 0,
		time: 192000,
		units: 0,
		dollar: 13468840704,
        cost: 122444006400,
        ceo: {
            cost: 2000,
            has: false
        }
	},
	plane_small: {
		id: 'plane_small',
		running: false,
		end: 0,
		time: 384000,
		units: 0,
		dollar: 242439132672,
        cost: 2203992115200,
        ceo: {
            cost: 24500000000000,
            has: false
        }
	},
	plane_medium: {
		id: 'plane_medium',
		running: false,
		end: 0,
		time: 768000,
		units: 0,
		dollar: 4363904388096,
        cost: 39671858073600,
        ceo: {
            cost: 8000000000000000,
            has: false
        }
	},
	plane_large: {
		id: 'plane_large',
		running: false,
		end: 0,
		time: 1536000,
		units: 0,
		dollar: 78550278985728,
        cost: 714093445324800,
        ceo: {
            cost: 140000000000000000,
            has: false
        }
	},
	ship_large: {
		id: 'ship_large',
		running: false,
		end: 0,
		time: 3072000,
		units: 0,
		dollar: 1413905021743104,
        cost: 12853682015846400,
        ceo: {
            cost: 2600000000000000000,
            has: false
        }
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
        plane_rental: document.getElementById('plane_rental'),
        plane_small: document.getElementById('plane_small'),
        plane_medium: document.getElementById('plane_medium'),
        plane_large: document.getElementById('plane_large'),
        ship_large: document.getElementById('ship_large')
    },
	text: {
		score: document.getElementById('userScore')
	}
};

browser.alarms.onAlarm.addListener(cycleEnd);
let loaded = browser.storage.local.get();
loaded.then(loadGame);
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
    const write = {
        storageVersion: 2,
        settings: {
            muted: setting.mute
        },
        data: {
            score: data.score.toFixed(2),
            left: Date.now(),
            vehicle: {
                bike: {
                    units: data.bike.units,
                    ceo: data.bike.ceo.has,
                    end: data.bike.end
                },
                taxi: {
                    units: data.taxi.units,
                    ceo: data.taxi.ceo.has,
                    end: data.taxi.end
                },
                bus: {
                    units: data.bus.units,
                    ceo: data.bus.ceo.has,
                    end: data.bus.end
                },
                tram: {
                    units: data.tram.units,
                    ceo: data.tram.ceo.has,
                    end: data.tram.end
                },
                ferry: {
                    units: data.ferry.units,
                    ceo: data.ferry.ceo.has,
                    end: data.ferry.end
                },
                subway: {
                    units: data.subway.units,
                    ceo: data.subway.ceo.has,
                    end: data.subway.end
                },
                train: {
                    units: data.train.units,
                    ceo: data.train.ceo.has,
                    end: data.train.end
                },
                plane_rental: {
                    units: data.plane_rental.units,
                    ceo: data.plane_rental.ceo.has,
                    end: data.plane_rental.end
                },
                plane_small: {
                    units: data.plane_small.units,
                    ceo: data.plane_small.ceo.has,
                    end: data.plane_small.end
                },
                plane_medium: {
                    units: data.plane_medium.units,
                    ceo: data.plane_medium.ceo.has,
                    end: data.plane_medium.end
                },
                plane_large: {
                    units: data.plane_large.units,
                    ceo: data.plane_large.ceo.has,
                    end: data.plane_large.end
                },
                ship_large: {
                    units: data.ship_large.units,
                    ceo: data.ship_large.ceo.has,
                    end: data.ship_large.end
                }
            }
        }
    };

	browser.storage.local.set(write);
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

    UI.screen.information.title.textContent = UI.row[vehicle.id].getElementsByClassName('bar')[0].textContent;
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
    UI.screen.information.salary.textContent = minifyNumber(vehicle.ceo.cost);

    if (vehicle.ceo.has) {
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
	
    if (data.score >= vehicle.ceo.cost) {
        data.score -= vehicle.ceo.cost;
		vehicle.ceo.has = true;
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
	const progressBar = UI.row[vehicle.id].getElementsByClassName('bar')[0];
	const button = UI.row[vehicle.id].getElementsByClassName('work')[0];
	let currentTime = Date.now();
	
	vehicle.running = true;
	currentTime += vehicle.time;
	vehicle.end = currentTime;

	button.disabled = true;
	startAnimation(progressBar);
    
    browser.alarms.create(vehicle.id, {
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
	const button = UI.row[vehicle.id].getElementsByClassName('work')[0];
	
	vehicle.running = false;
	vehicle.end = 0;
    data.score += (vehicle.dollar * vehicle.units);
	updateScore();
	
	button.disabled = false;
	
    if (vehicle.ceo.has) {
		button.disabled = true;
		
        setTimeout(() => {
            cycle(vehicle.id)
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

        UI.row[vehicle.id].getElementsByClassName('count')[0].textContent = vehicle.units;
        
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

    if (saved.data) {
        // Load saved unit data
        data.bike.units = saved.data.vehicle.bike.units;
        data.taxi.units = saved.data.vehicle.taxi.units;
        data.bus.units = saved.data.vehicle.bus.units;
        data.tram.units = saved.data.vehicle.tram.units;
        data.ferry.units = saved.data.vehicle.ferry.units;
        data.subway.units = saved.data.vehicle.subway.units;
        data.train.units = saved.data.vehicle.train.units;
        data.plane_rental.units = saved.data.vehicle.plane_rental.units;
        data.plane_small.units = saved.data.vehicle.plane_small.units;
        data.plane_medium.units = saved.data.vehicle.plane_medium.units;
        data.plane_large.units = saved.data.vehicle.plane_large.units;
        data.ship_large.units = saved.data.vehicle.ship_large.units;

        // Load saved CEO data
        data.bike.ceo.has = saved.data.vehicle.bike.ceo;
        data.taxi.ceo.has = saved.data.vehicle.taxi.ceo;
        data.bus.ceo.has = saved.data.vehicle.bus.ceo;
        data.tram.ceo.has = saved.data.vehicle.tram.ceo;
        data.ferry.ceo.has = saved.data.vehicle.ferry.ceo;
        data.subway.ceo.has = saved.data.vehicle.subway.ceo;
        data.train.ceo.has = saved.data.vehicle.train.ceo;
        data.plane_rental.ceo.has = saved.data.vehicle.plane_rental.ceo;
        data.plane_small.ceo.has = saved.data.vehicle.plane_small.ceo;
        data.plane_medium.ceo.has = saved.data.vehicle.plane_medium.ceo;
        data.plane_large.ceo.has = saved.data.vehicle.plane_large.ceo;
        data.ship_large.ceo.has = saved.data.vehicle.ship_large.ceo;

        // Load last runs
        data.bike.end = saved.data.vehicle.bike.end;
        data.taxi.end = saved.data.vehicle.taxi.end;
        data.bus.end = saved.data.vehicle.bus.end;
        data.tram.end = saved.data.vehicle.tram.end;
        data.ferry.end = saved.data.vehicle.ferry.end;
        data.subway.end = saved.data.vehicle.subway.end;
        data.train.end = saved.data.vehicle.train.end;
        data.plane_rental.end = saved.data.vehicle.plane_rental.end;
        data.plane_small.end = saved.data.vehicle.plane_small.end;
        data.plane_medium.end = saved.data.vehicle.plane_medium.end;
        data.plane_large.end = saved.data.vehicle.plane_large.end;
        data.ship_large.end = saved.data.vehicle.ship_large.end;

        // Load other data
        data.score = saved.data.score;
        setting.mute = saved.settings.muted;
        dateLeft = saved.data.lastplayed;
    } else {
        const write = {
            storageVersion: 2,
            settings: {
                muted: false
            },
            data: {
                score: 200,
                left: 1,
                vehicle: {
                    bike: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    taxi: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    bus: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    tram: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    ferry: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    subway: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    train: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    plane_rental: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    plane_small: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    plane_medium: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    plane_large: {
                        units: 0,
                        ceo: false,
                        end: 0
                    },
                    ship_large: {
                        units: 0,
                        ceo: false,
                        end: 0
                    }
                }
            }
        };

        browser.storage.local.set(write);
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
		data.plane_rental,
		data.plane_small,
		data.plane_medium,
		data.plane_large,
		data.ship_large
	];

    // Calculate income while away
    const dateDiff = Date.now() - dateLeft;
	const scoreBefore = data.score;
	
    for (let i = 0; i < vehicle.length; i++) {

		let dateNow = Date.now();
		// Add money earned by automatic processes while away (if there's a CEO)
        if (vehicle[i].ceo.has) {
			if ((dateNow - vehicle[i].end) >= vehicle[i].time) {
				data.score += Math.floor(dateDiff / vehicle[i].time) * vehicle[i].dollar * vehicle[i].units;
				const completed = dateDiff % vehicle[i].time;
				const nextTime = dateNow + vehicle[i].time - completed
				vehicle[i].end = nextTime;
			}
		}

		if (vehicle[i].end && vehicle[i].end != 0) {
			// Handle if the vehicle has been run at all
			

			if ((dateNow - vehicle[i].end) >= vehicle[i].time) {
				// Add completed time if a vehicle run was completed while game was closed
				data.score += vehicle[i].dollar;
			} else if (((dateNow - vehicle[i].end) < vehicle[i].time) && ((dateNow - vehicle[i].end) > -vehicle[i].time)) {
				// Resume the work cycle if the vehicle cycle is still in progress
				const progressBar = UI.row[vehicle[i].id].getElementsByClassName('bar')[0];
				const button = UI.row[vehicle[i].id].getElementsByClassName('work')[0];
				
				vehicle[i].running = true;
				
				button.disabled = true;
				const animationDelay = (vehicle[i].end - dateNow - vehicle[i].time) / 1000;
				startDelayedAnimation(progressBar, animationDelay);
				
				browser.alarms.create(vehicle[i].id, {
					when: vehicle[i].end
				});
			}
		}
	}
	
	// Calculate difference in score
    const scoreDiff = data.score - scoreBefore;

    // Setup unit counters and start work
    for (let i = 0; i < vehicle.length; i++) {
		UI.row[vehicle[i].id].getElementsByClassName('count')[0].textContent = vehicle[i].units;
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
		data.plane_rental,
		data.plane_small,
		data.plane_medium,
		data.plane_large,
		data.ship_large
	];
	
    for (let i = 0; i < vehicle.length; i++) {
        let button;
        // Check if player can afford to purchase vehicle
        button = UI.row[vehicle[i].id].getElementsByClassName('buy')[0];
        if (data.score >= vehicle[i].cost) {
            button.disabled = false;
        } else {
            button.disabled = true;
		}
		
        // Check if player can afford a CEO
        button = UI.row[vehicle[i].id].getElementsByClassName('hire')[0];
        if (data.score >= vehicle[i].ceo.cost) {
            button.disabled = false;
        } else {
            button.disabled = true;
		}
		
		// Check that player doesn't have a CEO already
        // and that they own at least 1 vehicle
        button = UI.row[vehicle[i].id].getElementsByClassName('work')[0];
        if (vehicle[i].units > 0 && !(vehicle[i].ceo.has)) {
            button.disabled = false;
        } else {
            button.disabled = true;
            UI.row[vehicle[i].id].getElementsByClassName('hire')[0].disabled = true;
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

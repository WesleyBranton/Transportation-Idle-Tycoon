/**
 * Migrate Storage API data to the new schema
 * @param {Object} data
 */
async function migrateData(data) {
    await browser.storage.local.clear();

    if (data.gamedata.score) {
        const temp = {
            storageVersion: 2,
            settings: {
                muted: data.gamedata.mute
            },
            data: {
                score: data.gamedata.score,
                left: data.gamedata.lastplayed,
                vehicle: {
                    bike: {
                        units: data.gamedata.bike_units,
                        ceo: data.gamedata.bike_ceo,
                        end: data.gamedata.bike_lastrun
                    },
                    taxi: {
                        units: data.gamedata.taxi_units,
                        ceo: data.gamedata.taxi_ceo,
                        end: data.gamedata.taxi_lastrun
                    },
                    bus: {
                        units: data.gamedata.bus_units,
                        ceo: data.gamedata.bus_ceo,
                        end: data.gamedata.bus_lastrun
                    },
                    tram: {
                        units: data.gamedata.tram_units,
                        ceo: data.gamedata.tram_ceo,
                        end: data.gamedata.tram_lastrun
                    },
                    ferry: {
                        units: data.gamedata.ferry_units,
                        ceo: data.gamedata.ferry_ceo,
                        end: data.gamedata.ferry_lastrun
                    },
                    subway: {
                        units: data.gamedata.subway_units,
                        ceo: data.gamedata.subway_ceo,
                        end: data.gamedata.subway_lastrun
                    },
                    train: {
                        units: data.gamedata.train_units,
                        ceo: data.gamedata.train_ceo,
                        end: data.gamedata.train_lastrun
                    },
                    plane_rental: {
                        units: data.gamedata.planerent_units,
                        ceo: data.gamedata.planerent_ceo,
                        end: data.gamedata.planerent_lastrun
                    },
                    plane_small: {
                        units: data.gamedata.smplane_units,
                        ceo: data.gamedata.smplane_ceo,
                        end: data.gamedata.smplane_lastrun
                    },
                    plane_medium: {
                        units: data.gamedata.mdplane_units,
                        ceo: data.gamedata.mdplane_ceo,
                        end: data.gamedata.mdplane_lastrun
                    },
                    plane_large: {
                        units: data.gamedata.airliner_units,
                        ceo: data.gamedata.airliner_ceo,
                        end: data.gamedata.airliner_lastrun
                    },
                    ship_large: {
                        units: data.gamedata.cruiseliner_units,
                        ceo: data.gamedata.cruiseliner_ceo,
                        end: data.gamedata.cruiseliner_lastrun
                    }
                }
            }
        };

        browser.storage.local.set(temp);
    }
}

/**
 * Check if Storage API data needs to be migrated to new version
 */
async function checkData() {
    const data = await browser.storage.local.get();

    if (!data.storageVersion && data.storageVersion != 2) {
        migrateData(data);
    }
}

/**
 * Handle extension installation/update actions
 * @param {Object} details 
 */
function installHandler(details) {
    switch (details.reason) {
        case 'update':
            checkData();
            break;
    }
}

browser.runtime.onInstalled.addListener(installHandler);

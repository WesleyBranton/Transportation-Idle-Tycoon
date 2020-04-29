/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function resetGame() {
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
            bike_lastruns: 1,
            taxi_lastruns: 1,
            bus_lastruns: 1,
            tram_lastruns: 1,
            ferry_lastruns: 1,
            subway_lastruns: 1,
            train_lastruns: 1,
            planerent_lastruns: 1,
            smplane_lastruns: 1,
            mdplane_lastruns: 1,
            airliner_lastruns: 1,
            cruiseliner_lastruns: 1,
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

    document.body.classList.remove('not-retired');
    document.body.classList.add('is-retired');
}

document.getElementById('retire').addEventListener('click', resetGame);

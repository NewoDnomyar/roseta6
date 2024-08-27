document.addEventListener('DOMContentLoaded', function() {
    const sortOptions = document.getElementById('sortOptions');
    const tileLibraryContainer = document.getElementById('tileLibraryContainer');
    const zoomOverlay = document.getElementById('zoomOverlay');
    const zoomImage = document.getElementById('zoomImage');
    const closeButton = document.getElementById('closeButton');

    const TILE_IMAGES = {
        "tl1": "assets/tiles/tl1 28 by zach bryan.png",
        "tl2": "assets/tiles/tl2 weight+mass.png",
        "tl3": "assets/tiles/tl3 volume & capacity.png",
        "tl4": "assets/tiles/tl4 time.png",
        "tl5": "assets/tiles/tl5 speed.png",
        "tl6": "assets/tiles/tl6 energy.png",
        "tl9": "assets/tiles/tl9 power.png",
        "tl10": "assets/tiles/tl10 pressure.png",
        "tl11": "assets/tiles/tl11 digital storage.png",
        "tl13": "assets/tiles/tl13 angles.png",
        "tl14": "assets/tiles/tl14 currency.png",
        "tl15": "assets/tiles/tl15 cooking.png",
        "tl16": "assets/tiles/tl16 constitutional law.png",
        "tl17": "assets/tiles/tl17 contract law.png",
        "tl18": "assets/tiles/tl18 criminal law.png",
        "tl19": "assets/tiles/tl19 business law.png",
        "tl20": "assets/tiles/tl20 property law.png",
        "tl21": "assets/tiles/tl21 tort law.png",
        "tl22": "assets/tiles/tl22 software development.png",
        "tl23": "assets/tiles/tl23 cybersecurity.png",
        "tl24": "assets/tiles/tl24 networking basics.png",
        "tl25": "assets/tiles/tl25 computer architecture.png",
        "tl26": "assets/tiles/tl26 common algorithms.png",
        "tl27": "assets/tiles/tl27 data structures.png",
        "tl28": "assets/tiles/tl28 basic programming concepts.png",
        "tl29": "assets/tiles/tl29 cognitive biases.png",
        "tl30": "assets/tiles/tl30 learning theories.png",
        "tl32": "assets/tiles/tl32 mental health disorders.png",
        "tl33": "assets/tiles/tl33 therapeutic approaches.png",
        "tl34": "assets/tiles/tl34 syntax.png",
        "tl35": "assets/tiles/tl35 phonetics.png",
        "tl36": "assets/tiles/tl36 morphology.png",
        "tl37": "assets/tiles/tl37 semantics.png",
        "tl38": "assets/tiles/tl38 pragmatics.png",
        "tl39": "assets/tiles/tl39 advanced vocabulary.png",
        "tl40": "assets/tiles/tl40 business vocabulary.png",
        "tl41": "assets/tiles/tl41 academic vocabulary.png",
        "tl42": "assets/tiles/tl42 common suffixes.png",
        "tl43": "assets/tiles/tl43 cooking techniques.png",
        "tl44": "assets/tiles/tl44 nutrition; macronutrients.png",
        "tl45": "assets/tiles/tl45 herbs & spices.png",
        "tl46": "assets/tiles/tl46 dietary requirements.png",
        "tl47": "assets/tiles/tl47 food safety.png",
        "tl48": "assets/tiles/tl48 10 commandments.png",
        "tl49": "assets/tiles/tl49 the beatitudes.png",
        "tl50": "assets/tiles/tl50 the fruit of the spirit.png",
        "tl51": "assets/tiles/tl51 the lord's prayer.png",
        "tl52": "assets/tiles/tl52 books of the old testament.png",
        "tl53": "assets/tiles/tl53 emergency nursing trauma protocols.png",
        "tl54": "assets/tiles/tl54 pediatric nursing growth milestones.png",
        "tl55": "assets/tiles/tl55 oncology nursing chemotherapy protocols.png",
        "tl56": "assets/tiles/tl56 geriatric nursing cognitive impairment.png",
        "tl57": "assets/tiles/tl57 critical care nursing hemodynamic monitoring.png",
        "tl58": "assets/tiles/tl58 advanced nursing acls.png",
        "tl59": "assets/tiles/tl59 advanced nursing sepsis management.png",
        "tl60": "assets/tiles/tl60 advanced nursing ventilator management.png",
        "tl61": "assets/tiles/tl61 advanced nursing advanced wound care.png",
        "tl62": "assets/tiles/tl62 advanced nursing logotherapy.png",
        "tl63": "assets/tiles/tl63 linguistics lexicology.png",
        "tl64": "assets/tiles/tl64 linguistics morphology.png",
        "tl65": "assets/tiles/tl65 linguistics semantics.png",
        "tl66": "assets/tiles/tl66 linguistics sociolinguistics.png",
        "tl67": "assets/tiles/tl67 linguistics sat act words.png",
        "tl68": "assets/tiles/tl68 vocabulary basic wordlist.png",
        "tl69": "assets/tiles/tl69 vocabulary advanced wordlist.png",
        "tl70": "assets/tiles/tl70 vocabulary medical words.png",
        "tl71": "assets/tiles/tl71 vocabulary business words.png",
        "tl72": "assets/tiles/tl72 vocabulary legal words.png",
        "tl73": "assets/tiles/tl73 philosophy socratic method.png",
        "tl74": "assets/tiles/tl74 philosophy plato's theory of forms.png",
        "tl75": "assets/tiles/tl75 philosophy aristotle's virtue ethics.png",
        "tl76": "assets/tiles/tl76 philosophy kant's deontological ethics.png",
        "tl77": "assets/tiles/tl77 philosophy nietzsche's will to power.png",
        "tl78": "assets/tiles/tl78 us government three branches.png",
        "tl79": "assets/tiles/tl79 us government congressional powers.png",
        "tl80": "assets/tiles/tl80 us government electoral college.png",
        "tl81": "assets/tiles/tl81 us government supreme court cases.png",
        "tl82": "assets/tiles/tl82 emergency nursing trauma protocols.png",
        "tl83": "assets/tiles/tl83 patrick mahomes qb Kansas city chiefs.png",
        "tl84": "assets/tiles/tl84 lamar jackson qb baltimore ravens.png",
        "tl87": "assets/tiles/tl87 christian mccaffrey rb san francisco 49ers.png",
        "tl88": "assets/tiles/tl88 critical care nursing hemodynamic monitoring.png",
        "tl89": "assets/tiles/tl89 football defensive coverages.png",
        "tl90": "assets/tiles/tl90 advanced passing concepts.png",
        "tl91": "assets/tiles/tl91 football advanced passing concepts.png",
        "tl92": "assets/tiles/tl92 football blocking schemes.png",
        "tl94": "assets/tiles/tl94 nfl pass interference.png",
        "tl95": "assets/tiles/tl95 nfl targeting rule.png",
        "tl96": "assets/tiles/tl96 nfl replay review.png",
        "tl97": "assets/tiles/tl97 nfl salary cap.png",
        "tl98": "assets/tiles/tl98 offensive formations nfl.png",
        "tl104": "assets/tiles/tl104 guitar scales.png",
        "tl502": "assets/tiles/tl502 back.png",
        "tl503": "assets/tiles/tl503 cover no newoco.png",
    };

    // Convert TILE_IMAGES to an array of objects for easier manipulation
    const images = Object.keys(TILE_IMAGES).map(key => {
        return {
            name: key,
            src: TILE_IMAGES[key]
        };
    });

    // Function to display the tiles
    function displayTiles(tiles) {
        tileLibraryContainer.innerHTML = ''; // Clear previous tiles
        tiles.forEach(tile => {
            const imgElement = document.createElement('img');
            imgElement.src = tile.src;
            imgElement.alt = tile.name;
            imgElement.classList.add('library-tile');
            imgElement.addEventListener('click', () => {
                zoomImage.src = tile.src;
                zoomOverlay.style.display = 'flex';
            });
            tileLibraryContainer.appendChild(imgElement);
        });
    }

    // Function to sort tiles
    function sortTiles(criteria) {
        let sortedTiles = [];
        if (criteria === 'name') {
            sortedTiles = [...images].sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === 'category') {
            sortedTiles = [...images].sort((a, b) => a.name.localeCompare(b.name)); // Assuming category is based on name for now
        }
        displayTiles(sortedTiles);
    }

    // Initial display of tiles
    displayTiles(images);

    // Event listener for sort options
    sortOptions.addEventListener('change', function() {
        const criteria = sortOptions.value;
        sortTiles(criteria);
    });

    // Event listener for closing the zoomed image
    closeButton.addEventListener('click', () => {
        zoomOverlay.style.display = 'none';
    });
});

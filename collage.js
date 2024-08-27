document.addEventListener('DOMContentLoaded', function() {
    const tileSelector = document.getElementById('tileSelector');
    const selectedTilesContainer = document.getElementById('selectedTilesContainer');
    const rosetaCodeElement = document.getElementById('rosetacodeID');
    const frontCanvas = document.getElementById('frontCanvas');
    const backCanvas = document.getElementById('backCanvas');
    const frontCtx = frontCanvas.getContext('2d');
    const backCtx = backCanvas.getContext('2d');
    const clearRSIDButton = document.getElementById('clearRSID');

    let selectedTiles = [];
    let collageCode = '';

TILE_IMAGES = {
    "tl1": "assets/tiles/tl1 28 by zach bryan",
    "tl2": "assets/tiles/tl2 weight+mass.png",
    "tl3": "assets/tiles/tl3 volume & capacity.png",
    "tl4": "assets/tiles/tl4 Time.png",
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
    "tl44": "assets/tiles/tl44 nutrition macronutrients.png",
    "tl45": "assets/tiles/tl45 herbs & spices.png",
    "tl46": "assets/tiles/tl46 dietary requirements.png",
    "tl47": "assets/tiles/tl47 food safety.png",
    "tl48": "assets/tiles/tl48 10 commandments.png",
    "tl49": "assets/tiles/tl49 the beatitudes.png",
    "tl50": "assets/tiles/tl50 the fruit of the spirit.png",
    "tl51": "assets/tiles/tl51 the lords prayer.png",
    "tl52": "assets/tiles/tl52 Books of the Old Testament.png",
    "tl53": "assets/tiles/tl53 cover no newco.png",
    "tl54": "assets/tiles/tl54 Emergency Nursing Growth Milestones.png",
    "tl55": "assets/tiles/tl55 Oncology Nursing Chemotherapy Protocols.png",
    "tl56": "assets/tiles/tl56 Geriatric Nursing Cognitive Impairments.png",
    "tl57": "assets/tiles/tl57 Critical Care Nursing Hemodynamic Monitoring.png",
    "tl58": "assets/tiles/tl58 Advanced Nursing ACLS.png",
    "tl59": "assets/tiles/tl59 Advanced Nursing Sepsis Management.png",
    "tl60": "assets/tiles/tl60 Advanced Nursing Ventilator.png",
    "tl61": "assets/tiles/tl61 Linguistics Phonology.png",
    "tl62": "assets/tiles/tl62 Linguistics Lexicology.png",
    "tl63": "assets/tiles/tl63 Linguistics Semantics.png",
    "tl64": "assets/tiles/tl64 Linguistics Morphosyntax.png",
    "tl65": "assets/tiles/tl65 Linguistics Syntax.png",
    "tl66": "assets/tiles/tl66 Linguistics Sociolinguistics.png",
    "tl67": "assets/tiles/tl67 Linguistics Semantics.png",
    "tl69": "assets/tiles/tl69 Vocabulary SAT ACT Words.png",
    "tl70": "assets/tiles/tl70 Vocabulary Medical Words.png",
    "tl71": "assets/tiles/tl71 Vocabulary Business Words.png",
    "tl72": "assets/tiles/tl72 Vocabulary Legal Words.png",
    "tl73": "assets/tiles/tl73 Philosophy Socratic Method.png",
    "tl74": "assets/tiles/tl74 Philosophy Plato's Theory of Forms.png",
    "tl75": "assets/tiles/tl75 Philosophy Aristotle's Virtue Ethics.png",
    "tl76": "assets/tiles/tl76 Philosophy Kant's Deontological Ethics.png",
    "tl77": "assets/tiles/tl77 Philosophy Nietzsche's Will to Power.png",
    "tl78": "assets/tiles/tl78 US Government Three Branches.png",
    "tl80": "assets/tiles/tl80 US Government Congressional Powers.png",
    "tl81": "assets/tiles/tl81 US Government Electoral College.png",
    "tl82": "assets/tiles/tl82 US Government Supreme Court Cases.png",
    "tl83": "assets/tiles/tl83 Emergency Nursing Trauma Protocols.png",
    "tl84": "assets/tiles/tl84 NFL Pass Interference.png",
    "tl85": "assets/tiles/tl85 Patrick Mahomes QB Kansas City Chiefs.png",
    "tl86": "assets/tiles/tl86 Lamar Jackson QB Baltimore Ravens.png",
    "tl87": "assets/tiles/tl87 Christian McCaffrey RB San Francisco 49ers.png",
    "tl89": "assets/tiles/tl89 Football Offensive Formations NFL.png",
    "tl91": "assets/tiles/tl91 Advanced Passing Concepts.png",
    "tl92": "assets/tiles/tl92 Football Blocking Schemes.png",
    "tl97": "assets/tiles/tl97 NFL Replay Review.png",
    "tl98": "assets/tiles/tl98 NFL Salary Cap.png",
    "tl104": "assets/tiles/tl104 guitar scales.png",
    "tl107": "assets/tiles/tl107 fretboard.png",
    "tl501": "assets/tiles/tl501 cover.png",
}


    function loadTileSelector() {
        images.forEach(image => {
            const option = document.createElement('option');
            option.value = image.id;
            option.textContent = image.name;
            tileSelector.appendChild(option);
        });
    }

    function updateCollageCode() {
        collageCode = selectedTiles.map((tile, index) => `${index + 1}:${tile.id}`).join('|');
        rosetaCodeElement.textContent = `Roseta Code: ${collageCode}`;
        localStorage.setItem('rsidCode', collageCode);
        drawCollage();
    }

    function drawCollage() {
        frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
        backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);

        const tileWidth = 324;
        const tileHeight = 204;
        const tilesPerRow = Math.floor(frontCanvas.width / tileWidth);

        selectedTiles.forEach((tile, index) => {
            const imgElement = new Image();
            imgElement.src = tile.src;

            imgElement.onload = function() {
                const x = (index % tilesPerRow) * tileWidth;
                const y = Math.floor(index / tilesPerRow) * tileHeight;

                if (index < tilesPerRow * Math.floor(frontCanvas.height / tileHeight)) {
                    frontCtx.drawImage(imgElement, x, y, tileWidth, tileHeight);
                    drawGridLines(frontCtx, x, y, tileWidth, tileHeight);
                } else {
                    const backIndex = index - tilesPerRow * Math.floor(frontCanvas.height / tileHeight);
                    const backX = (backIndex % tilesPerRow) * tileWidth;
                    const backY = Math.floor(backIndex / tilesPerRow) * tileHeight;
                    backCtx.drawImage(imgElement, backX, backY, tileWidth, tileHeight);
                    drawGridLines(backCtx, backX, backY, tileWidth, tileHeight);
                }
            };
        });
    }

    function drawGridLines(ctx, x, y, width, height) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
    }

    tileSelector.addEventListener('change', function() {
        const selectedTileId = tileSelector.value;
        const selectedTile = images.find(image => image.id === selectedTileId);

        if (selectedTiles.length < 48) {
            selectedTiles.push(selectedTile);

            const imgElement = document.createElement('img');
            imgElement.src = selectedTile.src;
            selectedTilesContainer.appendChild(imgElement);

            updateCollageCode();
        } else {
            alert("You have reached the maximum number of tiles (48).");
        }
        tileSelector.value = "";
    });

    clearRSIDButton.addEventListener('click', clearRSID);

    function clearRSID() {
        selectedTiles = [];
        collageCode = '';
        selectedTilesContainer.innerHTML = '';
        rosetaCodeElement.textContent = 'Roseta Code: ';
        localStorage.removeItem('rsidCode');
        frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
        backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
    }

    loadTileSelector();

    const storedRosetaCode = localStorage.getItem('rsidCode');
    if (storedRosetaCode) {
        collageCode = storedRosetaCode;
        rosetaCodeElement.textContent = `Roseta Code: ${collageCode}`;

        const tilePairs = collageCode.split('|');
        tilePairs.forEach(pair => {
            const [index, tileId] = pair.split(':');
            const tile = images.find(image => image.id === tileId);
            if (tile) {
                selectedTiles.push(tile);
                const imgElement = document.createElement('img');
                imgElement.src = tile.src;
                selectedTilesContainer.appendChild(imgElement);
            }
        });

        drawCollage();
    }
});

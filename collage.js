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

    const images = [
        { id: "tl1", src: "assets/tiles/tl2 weight+mass.png", name: "Weight + Mass" },
        { id: "tl2", src: "assets/tiles/tl3 volume & capacity.png", name: "Volume & Capacity" },
        { id: "tl3", src: "assets/tiles/tl4 Time.png", name: "Time" },
        { id: "tl4", src: "assets/tiles/tl5 speed.png", name: "Speed" },
        { id: "tl5", src: "assets/tiles/tl6 energy.png", name: "Energy" },
        { id: "tl6", src: "assets/tiles/tl9 power.png", name: "Power" },
        { id: "tl7", src: "assets/tiles/tl10 pressure.png", name: "Pressure" },
        { id: "tl8", src: "assets/tiles/tl11 didgital storage.png", name: "Digital Storage" },
        { id: "tl9", src: "assets/tiles/tl13 angles.png", name: "Angles" },
        { id: "tl10", src: "assets/tiles/tl14 currency.png", name: "Currency" },
        { id: "tl11", src: "assets/tiles/tl15 cooking.png", name: "Cooking" },
        { id: "tl12", src: "assets/tiles/tl16 constitutional law.png", name: "Constitutional Law" },
        { id: "tl13", src: "assets/tiles/tl17 contract law.png", name: "Contract Law" },
        { id: "tl14", src: "assets/tiles/tl18 criminal law.png", name: "Criminal Law" },
        { id: "tl15", src: "assets/tiles/tl19 business law.png", name: "Business Law" },
        { id: "tl16", src: "assets/tiles/tl20 property law.png", name: "Property Law" },
        { id: "tl17", src: "assets/tiles/tl21 tort law.png", name: "Tort Law" },
        { id: "tl18", src: "assets/tiles/tl22 software development.png", name: "Software Development" },
        { id: "tl19", src: "assets/tiles/tl23 cybersecurity.png", name: "Cybersecurity" },
        { id: "tl20", src: "assets/tiles/tl24 networking basics.png", name: "Networking Basics" },
        { id: "tl21", src: "assets/tiles/tl25 computer architecture.png", name: "Computer Architecture" },
        { id: "tl22", src: "assets/tiles/tl26 common algorithms.png", name: "Common Algorithms" },
        { id: "tl23", src: "assets/tiles/tl27 data structures.png", name: "Data Structures" },
        { id: "tl24", src: "assets/tiles/tl28_basic_programming_concepts.png", name: "Basic Programming Concepts" },
        { id: "tl25", src: "assets/tiles/tl29 cognitive biases.png", name: "Cognitive Biases" },
        { id: "tl26", src: "assets/tiles/tl30 learning theories.png", name: "Learning Theories" },
        { id: "tl27", src: "assets/tiles/tl32 mental health disorders.png", name: "Mental Health Disorders" },
        { id: "tl28", src: "assets/tiles/tl33 therapeutic approaches.png", name: "Therapeutic Approaches" },
        { id: "tl29", src: "assets/tiles/tl34 syntax.png", name: "Syntax" },
        { id: "tl30", src: "assets/tiles/tl35 phonetics.png", name: "Phonetics" },
        { id: "tl31", src: "assets/tiles/tl36 morphology.png", name: "Morphology" },
        { id: "tl32", src: "assets/tiles/tl37 semantics.png", name: "Semantics" },
        { id: "tl33", src: "assets/tiles/tl38 pragmatics.png", name: "Pragmatics" },
        { id: "tl34", src: "assets/tiles/tl39 advanced vocabulary.png", name: "Advanced Vocabulary" },
        { id: "tl35", src: "assets/tiles/tl40 business vocabulary.png", name: "Business Vocabulary" },
        { id: "tl36", src: "assets/tiles/tl41 academic vocabulary.png", name: "Academic Vocabulary" },
        { id: "tl37", src: "assets/tiles/tl42 common suffixes.png", name: "Common Suffixes" },
        { id: "tl38", src: "assets/tiles/tl43 cooking techniques.png", name: "Cooking Techniques" },
        { id: "tl39", src: "assets/tiles/tl44 nutrition; macronutrients.png", name: "Nutrition Macronutrients" },
        { id: "tl40", src: "assets/tiles/tl45 herbs & spices.png", name: "Herbs & Spices" },
        { id: "tl41", src: "assets/tiles/tl46 dietary requirements.png", name: "Dietary Requirements" },
        { id: "tl42", src: "assets/tiles/tl47 food safety.png", name: "Food Safety" },
        { id: "tl43", src: "assets/tiles/tl48 10 commandments.png", name: "10 Commandments" },
        { id: "tl44", src: "assets/tiles/tl49 the beatitudes.png", name: "The Beatitudes" },
        { id: "tl45", src: "assets/tiles/tl50 the fruit of the spirit.png", name: "The Fruit of the Spirit" },
        { id: "tl46", src: "assets/tiles/tl51 the lords prayer.png", name: "The Lord's Prayer" }
    ];

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

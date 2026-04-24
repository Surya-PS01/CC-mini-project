class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildFrequency(text) {
    let freq = {};
    for (let ch of text) {
        freq[ch] = (freq[ch] || 0) + 1;
    }
    return freq;
}

function buildTree(freq) {
    let nodes = [];

    for (let ch in freq) {
        nodes.push(new Node(ch, freq[ch]));
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);

        let left = nodes.shift();
        let right = nodes.shift();

        let parent = new Node(null, left.freq + right.freq, left, right);
        nodes.push(parent);
    }

    return nodes[0];
}

function generateCodes(node, code = "", map = {}) {
    if (!node) return;

    if (node.char !== null) {
        map[node.char] = code || "0";
    }

    generateCodes(node.left, code + "0", map);
    generateCodes(node.right, code + "1", map);

    return map;
}

function compress() {
    let text = document.getElementById("inputText").value;

    if (!text) {
        alert("Please enter text first");
        return;
    }

    let freq = buildFrequency(text);
    let tree = buildTree(freq);
    let codes = generateCodes(tree);

    let binary = "";
    for (let ch of text) {
        binary += codes[ch];
    }

    document.getElementById("binaryOutput").value = binary;

    let mapDisplay = "";
    for (let ch in codes) {
        mapDisplay += `${ch} : ${codes[ch]}\n`;
    }
    document.getElementById("mapOutput").innerText = mapDisplay;

    let packageObj = {
        data: binary,
        map: codes
    };

    let base64 = btoa(JSON.stringify(packageObj));
    document.getElementById("encodedOutput").value = base64;

    
    let originalBits = text.length * 8;
    let compressedBits = binary.length;

    let ratio = ((originalBits - compressedBits) / originalBits * 100).toFixed(2);

    document.getElementById("originalSize").innerText = originalBits + " bits";
    document.getElementById("compressedSize").innerText = compressedBits + " bits";
    document.getElementById("compressionRatio").innerText = ratio + "%";

   
    alert("Compression successful!\n\nCopy the Base64 encoded text to use it later for decompression.");
}



function decompress() {
    let encoded = document.getElementById("decodeInput").value;

    if (!encoded) {
        alert("Please paste encoded data");
        return;
    }

    try {
        let decodedObj = JSON.parse(atob(encoded));

        let data = decodedObj.data;
        let map = decodedObj.map;

        let reverseMap = {};
        for (let key in map) {
            reverseMap[map[key]] = key;
        }

        let result = "";
        let temp = "";

        for (let bit of data) {
            temp += bit;
            if (reverseMap[temp]) {
                result += reverseMap[temp];
                temp = "";
            }
        }

        document.getElementById("decodedText").value = result;

    } catch (e) {
        alert("Invalid encoded data!");
    }
}
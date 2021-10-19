import HuffmanNode from './huffmanNode.js';

const EMPTY_NODE_VALUE = -1;

export default class HuffmanEncoder {
    /**
     * Helper function to sort huffman nodes by its count in a descending manner.
     * @param {HuffmanNode} nodeA First huffman node.
     * @param {HuffmanNode} nodeB Second huffman node.
     */
    static byCountDescending(nodeA, nodeB) {
        return nodeA.count - nodeB.count;
    }

    /**
     * Static method creates a huffman tree from symbols.
     * @param {[number, number][]} symbols Array with pairs of symbol value and symbol count.
     * @returns {HuffmanNode} Root node of the huffman tree.
     */
    static getTree(symbols) {
        const nodes = symbols.map(
            ([value, count]) => new HuffmanNode({ value, count }),
        );
        let huffmanTree = [...nodes].sort(this.byCountDescending);

        while (huffmanTree.length > 1) {
            const [first, second, ...rest] = huffmanTree;

            const parentNode = new HuffmanNode({
                count: first.count + second.count,
                value: EMPTY_NODE_VALUE,
            });
            parentNode.left = first;
            parentNode.right = second;

            huffmanTree = [...rest, parentNode].sort(this.byCountDescending);
        }

        return huffmanTree[0];
    }

    /**
     * Static method creates an array with codes for every symbol in the Huffman tree.
     * @param {HuffmanNode} rootNode Root node of a huffman tree.
     * @returns {Map<number, string>} Map of symbol values with corresponding binary codes.
     */
    static getCodes(rootNode) {
        const codes = new Map();
        this.getPathForNode(rootNode, codes, '');

        return codes;
    }

    /**
     * Recursive function to get a path of a node.
     * @param {HuffmanNode} root Root node of a huffman tree.
     * @param {Map<number, string>} map Map of symbol values with corresponding binary codes.
     * @param {string} path Path taken to the current root node.
     */
    static getPathForNode(root, map, path) {
        const { left, right, value } = root;
        const isEndNode = !left && !right;
        if (isEndNode && value !== EMPTY_NODE_VALUE) {
            map.set(value, path);
            return;
        }

        if (left) {
            this.getPathForNode(left, map, `${path}0`);
        }

        if (right) {
            this.getPathForNode(right, map, `${path}1`);
        }
    }

    /**
     * Static method encodes the vlc code pairs and the source data itself.
     * @param {Map<number, string>} codes Map of symbol values with corresponding binary codes.
     * @param {DataView} sourceData Source data to be encoded using the code pairs.
     * @returns {string} Huffman encoded binary data as a string of bits.
     */
    static encodeData(codes, sourceData) {
        const sourceBytes = Array.from(Array(sourceData.byteLength)).map(
            (_, index) => sourceData.getUint8(index),
        );

        const encodedHuffmanCode = sourceBytes
            .map((byteData) => codes.get(byteData))
            .reduce((a, b) => `${a}${b}`, '');
        const vlcHeader = this.createVLCHeader(codes);

        return `${this.toBits(16, vlcHeader.length)}${vlcHeader}${encodedHuffmanCode}`;
    }

    /**
     * Helper function to convert numeric value to Bits with predefined length.
     * @param {number} length Length of the converted value in Bits.
     * @param {number} value Value of the number to be converted in Bits.
     * @returns {string}
     */
    static toBits(length, value) {
        return value.toString(2).padStart(length, '0');
    }

    /**
     * Helper function to cretae symbol code pair required for the VLC header
     * @param {number} symbol Value of the symbol.
     * @param {string} code Encoded code for the symbol as result of huffman encoding.
     * @returns {string} Symbol-Code pair (See README.md file).
     */
    static createSymbolCodePair(symbol, code) {
        const codeLength = code.length;
        return `${this.toBits(8, codeLength)}${this.toBits(8, symbol)}${code}`;
    }

    /**
     * Helper function to create VLC header for the Huffman-Binary data
     * @param {Map<number, string>} codes Map of symbol values with corresponding binary codes.
     * @returns {string}
     */
    static createVLCHeader(codes) {
        return [...codes.entries()]
            .map(([symbol, code]) => this.createSymbolCodePair(symbol, code))
            .reduce((a, b) => `${a}${b}`, '');
    }
}

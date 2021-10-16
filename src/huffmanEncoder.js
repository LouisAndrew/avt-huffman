export default class HuffmanEncoder {
    /**
     * Static method creates a huffman tree from symbols.
     * @param {[number, number][]} symbols Array with pairs of symbol value and symbol count.
     * @returns {HuffmanNode} Root node of the huffman tree.
     */
    static getTree(symbols) {
        console.log(symbols);
    }

    /**
     * Static method creates an array with codes for every symbol in the Huffman tree.
     * @param {HuffmanNode} rootNode Root node of a huffman tree.
     * @returns {Map<number, string>} Map of symbol values with corresponding binary codes.
     */
    static getCodes(rootNode) {
        const codes = new Map();

        // ...

        return codes;
    }

    /**
     * Static method encodes the vlc code pairs and the source data itself.
     * @param {Map<number, string>} codes Map of symbol values with corresponding binary codes.
     * @param {DataView} sourceData Source data to be encoded using the code pairs.
     * @returns {string} Huffman encoded binary data as a string of bits.
     */
    static encodeData(codes, sourceData) {
        let encodedString = '';

        // ...

        return encodedString;
    }
}

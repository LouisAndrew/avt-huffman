import HuffmanNode from './huffmanNode.js';

const EMPTY_NODE_VALUE = -1;

export default class HuffmanEncoder {
    /**
   * Helper function to sort huffman nodes by its count in a descending manner.
   * @param {HuffmanNode} nodeA First huffman node.
   * @param {HuffmanNode} nodeB Second huffman node.
   */
    static byCountDescending(nodeA, nodeB) {
        return nodeB.count - nodeA.count;
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
    // * Creates object (map) of symbols -> go through every nodes
        const codes = new Map();
        this.getPathForNode(rootNode, codes, '');
        console.log({ codes, rootNode });

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
    // * Input -> Audio data?
    // * Output -> Compressed audio data as binary?

        const encodedString = '';
        const sourceBytes = Array.from(Array(sourceData.byteLength)).map(
            (_, index) => sourceData.getUint8(index),
        );

        console.log({ codes, sourceData, sourceBytes });

        return encodedString;
    }
}

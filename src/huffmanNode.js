/**
 * @typedef {?HuffmanNode} ChildNode
 */

/**
 * Huffman tree node class.
 */
export default class HuffmanNode {
    /**
     * Huffman node constructor.
     * @param {object} huffmanNodeConstructorParam
     * @param {number} huffmanNodeConstructorParam.count Symbol count.
     * @param {number} huffmanNodeConstructorParam.value The symbol (character) itself.
     */
    constructor({ count, value }) {
        /**
         * Symbol count.
         */
        this.count = count;
        /**
         * The symbol (character) itself.
         */
        this.value = value;
        /**
         * Left child node.
         * @type {ChildNode}
         */
        this.left = null;
        /**
         * Right child node.
         * @type {ChildNode}
         */
        this.right = null;
    }
}

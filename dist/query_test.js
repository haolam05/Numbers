"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var list_1 = require("./list");
var query_1 = require("./query");
describe('query', function () {
    it('tokenize', function () {
        assert.deepEqual((0, query_1.tokenize)(""), []);
        assert.deepEqual((0, query_1.tokenize)("abc"), ["abc"]);
        assert.deepEqual((0, query_1.tokenize)("   "), []);
        assert.deepEqual((0, query_1.tokenize)("("), ["("]);
        assert.deepEqual((0, query_1.tokenize)(")"), [")"]);
        assert.deepEqual((0, query_1.tokenize)("()"), ["(", ")"]);
        assert.deepEqual((0, query_1.tokenize)("abc def"), ["abc", "def"]);
        assert.deepEqual((0, query_1.tokenize)("a(bc d)ef"), ["a", "(", "bc", "d", ")", "ef"]);
    });
    it('parsePrimary', function () {
        assert.throws(function () { return (0, query_1.parsePrimary)(list_1.nil); });
        assert.throws(function () { return (0, query_1.parsePrimary)((0, list_1.explode_array)(["blah"])); });
        assert.throws(function () { return (0, query_1.parsePrimary)((0, list_1.explode_array)(["(", "even"])); });
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["even"])), [query_1.even, list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["prime"])), [query_1.prime, list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["fibonacci"])), [query_1.fibonacci, list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["not", "even"])), [(0, query_1.not)(query_1.even), list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["not", "not", "prime"])), [(0, query_1.not)((0, query_1.not)(query_1.prime)), list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["not", "not", "not", "fibonacci"])), [(0, query_1.not)((0, query_1.not)((0, query_1.not)(query_1.fibonacci))), list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["(", "even", ")"])), [query_1.even, list_1.nil]);
        assert.deepEqual((0, query_1.parsePrimary)((0, list_1.explode_array)(["(", "even", "or", "prime", ")"])), [(0, query_1.or)(query_1.even, query_1.prime), list_1.nil]);
    });
    it('parseConjunction', function () {
        assert.throws(function () { return (0, query_1.parseConjunction)(list_1.nil); });
        assert.throws(function () { return (0, query_1.parseConjunction)((0, list_1.explode_array)(["even", "and",])); });
        assert.throws(function () { return (0, query_1.parseConjunction)((0, list_1.explode_array)(["even", "and", "even", "and"])); });
        assert.deepEqual((0, query_1.parseConjunction)((0, list_1.explode_array)(["even"])), [query_1.even, list_1.nil]);
        assert.deepEqual((0, query_1.parseConjunction)((0, list_1.explode_array)(["even", "and", "prime"])), [(0, query_1.and)(query_1.even, query_1.prime), list_1.nil]);
        assert.deepEqual((0, query_1.parseConjunction)((0, list_1.explode_array)(["even", "and", "prime", "and", "not", "fibonacci"])), [(0, query_1.and)(query_1.even, (0, query_1.and)(query_1.prime, (0, query_1.not)(query_1.fibonacci))), list_1.nil]);
    });
    it('parseDisjunction', function () {
        assert.throws(function () { return (0, query_1.parseDisjunction)(list_1.nil); });
        assert.throws(function () { return (0, query_1.parseDisjunction)((0, list_1.explode_array)(["even", "or",])); });
        assert.throws(function () { return (0, query_1.parseDisjunction)((0, list_1.explode_array)(["even", "or", "even", "or"])); });
        assert.deepEqual((0, query_1.parseDisjunction)((0, list_1.explode_array)(["even"])), [query_1.even, list_1.nil]);
        assert.deepEqual((0, query_1.parseDisjunction)((0, list_1.explode_array)(["even", "or", "prime"])), [(0, query_1.or)(query_1.even, query_1.prime), list_1.nil]);
        assert.deepEqual((0, query_1.parseDisjunction)((0, list_1.explode_array)(["even", "or", "prime", "or", "not", "fibonacci"])), [(0, query_1.or)(query_1.even, (0, query_1.or)(query_1.prime, (0, query_1.not)(query_1.fibonacci))), list_1.nil]);
        assert.deepEqual((0, query_1.parseDisjunction)((0, list_1.explode_array)(["even", "and", "prime", "or", "not", "even", "and", "fibonacci"])), [(0, query_1.or)((0, query_1.and)(query_1.even, query_1.prime), (0, query_1.and)((0, query_1.not)(query_1.even), query_1.fibonacci)), list_1.nil]);
    });
    it('parse', function () {
        assert.throws(function () { return (0, query_1.parse)((0, list_1.explode_array)(["(", "even", ")", "blah"])); });
        assert.deepEqual((0, query_1.parse)((0, list_1.explode_array)(["even", "and", "prime", "or", "not", "even", "and", "fibonacci"])), (0, query_1.or)((0, query_1.and)(query_1.even, query_1.prime), (0, query_1.and)((0, query_1.not)(query_1.even), query_1.fibonacci)));
        assert.deepEqual((0, query_1.parse)((0, list_1.explode_array)(["even", "and", "(", "prime", "or", "not", "even", ")", "and", "fibonacci"])), (0, query_1.and)(query_1.even, (0, query_1.and)((0, query_1.or)(query_1.prime, (0, query_1.not)(query_1.even)), query_1.fibonacci)));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9xdWVyeV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMsK0JBQTRDO0FBQzVDLGlDQUM4RTtBQUc5RSxRQUFRLENBQUMsT0FBTyxFQUFFO0lBRWhCLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDYixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsZ0JBQVEsRUFBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBQSxnQkFBUSxFQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBQSxnQkFBUSxFQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUs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
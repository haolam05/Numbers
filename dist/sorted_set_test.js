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
var sorted_set_1 = require("./sorted_set");
var list_1 = require("./list");
describe('sorted_set', function () {
    it('removeAll', function () {
        var set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        (0, sorted_set_1.removeAll)(set, []);
        assert.deepEqual(set, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        (0, sorted_set_1.removeAll)(set, [10]);
        assert.deepEqual(set, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        (0, sorted_set_1.removeAll)(set, [1, 2, 3]);
        assert.deepEqual(set, [4, 5, 6, 7, 8, 9]);
        (0, sorted_set_1.removeAll)(set, [5, 7]);
        assert.deepEqual(set, [4, 6, 8, 9]);
    });
    it('addAll', function () {
        var set = [1, 3, 5, 8];
        (0, sorted_set_1.addAll)(set, []);
        assert.deepEqual(set, [1, 3, 5, 8]);
        (0, sorted_set_1.addAll)(set, [10]);
        assert.deepEqual(set, [1, 3, 5, 8, 10]);
        (0, sorted_set_1.addAll)(set, [1, 2, 3]);
        assert.deepEqual(set, [1, 2, 3, 5, 8, 10]);
        (0, sorted_set_1.addAll)(set, [5, 7]);
        assert.deepEqual(set, [1, 2, 3, 5, 7, 8, 10]);
    });
    it('uniquify', function () {
        var set1 = [];
        (0, sorted_set_1.uniquify)(set1);
        assert.deepEqual(set1, []);
        var set2 = [1];
        (0, sorted_set_1.uniquify)(set2);
        assert.deepEqual(set2, [1]);
        var set3 = [1, 2];
        (0, sorted_set_1.uniquify)(set3);
        assert.deepEqual(set3, [1, 2]);
        var set4 = [1, 1];
        (0, sorted_set_1.uniquify)(set4);
        assert.deepEqual(set4, [1]);
        var set5 = [1, 1, 1];
        (0, sorted_set_1.uniquify)(set5);
        assert.deepEqual(set5, [1]);
        var set6 = [1, 2, 2];
        (0, sorted_set_1.uniquify)(set6);
        assert.deepEqual(set6, [1, 2]);
        var set7 = [1, 2, 3];
        (0, sorted_set_1.uniquify)(set7);
        assert.deepEqual(set7, [1, 2, 3]);
        var set8 = [1, 1, 2, 4, 4, 4, 5, 5, 7, 7, 8, 9, 10, 10, 10];
        (0, sorted_set_1.uniquify)(set8);
        assert.deepEqual(set8, [1, 2, 4, 5, 7, 8, 9, 10]);
    });
    // ----- NOTE: you may have to add imports to get these test to pass
    // ----- TODO (3d): - uncomment the tests for makeSortedNumberSet
    it('makeSortedNumberSet', function () {
        // TODO (4e): pass (1, 10) as the arguments to all calls to getNumbers
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([])).getNumbers(1, 10), (0, list_1.explode_array)([]));
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1])).getNumbers(1, 10), (0, list_1.explode_array)([1]));
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3])).getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3]));
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([3, 2, 1])).getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3]));
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 1, 2, 2, 3, 3])).getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3]));
        assert.deepEqual((0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 2, 49, 50, 50, 99, 100])).getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 49, 50, 99, 100]));
    });
    // ----- TODO (4f): - uncomment the tests for complement
    it('complement', function () {
        var set0 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([]));
        set0.complement();
        assert.deepEqual(set0.getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
        var set1 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1]));
        set1.complement();
        assert.deepEqual(set1.getNumbers(1, 10), (0, list_1.explode_array)([2, 3, 4, 5, 6, 7, 8, 9, 10]));
        var set4 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([2, 4, 6, 8]));
        set4.complement();
        assert.deepEqual(set4.getNumbers(1, 10), (0, list_1.explode_array)([1, 3, 5, 7, 9, 10]));
    });
    // ----- TODO (5b): - uncomment the tests for removeAll - infinite sets
    it('removeAll - infinite', function () {
        var set = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([3, 4, 5, 6]));
        var set1 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set1.removeAll(set);
        assert.deepEqual(set1.getNumbers(1, 10), (0, list_1.explode_array)([1, 2]));
        var set2 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set2.complement();
        set2.removeAll(set);
        assert.deepEqual(set2.getNumbers(1, 10), (0, list_1.explode_array)([7, 8, 9, 10]));
        set.complement();
        var set3 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set3.removeAll(set);
        assert.deepEqual(set3.getNumbers(1, 10), (0, list_1.explode_array)([3, 4]));
        var set4 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set4.complement();
        set4.removeAll(set);
        assert.deepEqual(set4.getNumbers(1, 10), (0, list_1.explode_array)([5, 6]));
    });
    // ----- TODO (5d): - uncomment the tests for removeAll - infinite sets
    it('addAll - infinite', function () {
        var set = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([3, 4, 5, 6]));
        var set1 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set1.addAll(set);
        assert.deepEqual(set1.getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6]));
        var set2 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set2.complement();
        set2.addAll(set);
        assert.deepEqual(set2.getNumbers(1, 10), (0, list_1.explode_array)([3, 4, 5, 6, 7, 8, 9, 10]));
        set.complement();
        var set3 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set3.addAll(set);
        assert.deepEqual(set3.getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 3, 4, 7, 8, 9, 10]));
        var set4 = (0, sorted_set_1.makeSortedNumberSet)((0, list_1.explode_array)([1, 2, 3, 4]));
        set4.complement();
        set4.addAll(set);
        assert.deepEqual(set4.getNumbers(1, 10), (0, list_1.explode_array)([1, 2, 5, 6, 7, 8, 9, 10]));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3NldF90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NvcnRlZF9zZXRfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWlDO0FBQ2pDLDJDQUFnRjtBQUNoRiwrQkFBdUM7QUFFdkMsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUVyQixFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ2QsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFBLHNCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2RCxJQUFBLHNCQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFBLHNCQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxD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Q0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQ3BGLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBRUgsd0RBQXdEO0lBQ3hELEVBQUUsQ0FBQyxZQUFZLEVBQUU7UUFDZixJQUFNLElBQUksR0FBRyxJQUFBLGdDQUFtQixFQUFDLElBQUEsb0JBQWEsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RixJQUFNLElBQUksR0FBRyxJQUFBLGdDQUFtQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztR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
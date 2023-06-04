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
var number_set_1 = require("./number_set");
describe('number_set', function () {
    // TODO (1d): change these tests to use makeBooleanNumberSet and call the
    //            corresponding functions of the object (i.e. .getNumbers())
    // TODO (4b): change getNumbers to take additional params 0, 100
    it('makeNumberSet', function () {
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([])).getNumbers(1, 100), (0, list_1.explode_array)([]));
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1])).getNumbers(1, 100), (0, list_1.explode_array)([1]));
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([50])).getNumbers(1, 100), (0, list_1.explode_array)([50]));
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([100])).getNumbers(1, 100), (0, list_1.explode_array)([100]));
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1, 2, 3])).getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 3]));
        assert.deepEqual((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1, 2, 49, 50, 99, 100])).getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 49, 50, 99, 100]));
    });
    it('addAll', function () {
        var set = (0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([2, 4, 6, 8]));
        set.addAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([2, 4, 6, 8]));
        set.addAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([3])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([2, 3, 4, 6, 8]));
        set.addAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([5, 9])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([2, 3, 4, 5, 6, 8, 9]));
        set.addAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1, 100])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 8, 9, 100]));
    });
    it('removeAll', function () {
        var set = (0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
        set.removeAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
        set.removeAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([10])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        set.removeAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1, 2, 3])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([4, 5, 6, 7, 8, 9]));
        set.removeAll((0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([5, 7])));
        assert.deepEqual(set.getNumbers(1, 100), (0, list_1.explode_array)([4, 6, 8, 9]));
    });
    // TODO: Ignore for now, uncomment in part 4b. 
    //       - You may have to add some imports upon uncommenting
    it('complement', function () {
        (0, number_set_1.setMaxForTesting)(10);
        var set0 = (0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([]));
        set0.complement();
        assert.deepEqual(set0.getNumbers(1, 100), (0, list_1.explode_array)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
        var set1 = (0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([1]));
        set1.complement();
        assert.deepEqual(set1.getNumbers(1, 100), (0, list_1.explode_array)([2, 3, 4, 5, 6, 7, 8, 9, 10]));
        var set4 = (0, number_set_1.makeBooleanNumberSet)((0, list_1.explode_array)([2, 4, 6, 8]));
        set4.complement();
        assert.deepEqual(set4.getNumbers(1, 100), (0, list_1.explode_array)([1, 3, 5, 7, 9, 10]));
        (0, number_set_1.setMaxForTesting)(100);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3NldF90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL251bWJlcl9zZXRfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWlDO0FBQ2pDLCtCQUF1QztBQUN2QywyQ0FBc0U7QUFHdEUsUUFBUSxDQUFDLFlBQVksRUFBRTtJQUVyQix5RUFBeUU7SUFDekUsd0VBQXdFO0lBQ3hFLGdFQUFnRTtJQUVoRSxFQUFFLENBQUMsZUFBZSxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBQSxpQ0FBb0IsRUFBQyxJQUFBLG9CQUFhLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUN2RSxJQUFBLG9CQUFhLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQ3hFLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQ3pFLElBQUEsb0JBQWEsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQzFFLElBQUEsb0JBQWEsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFDOUUsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQzVGLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNYLElBQU0sR0FBRyxHQUFHLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBQSxpQ0FBb0IsRUFBQyxJQUFBLG9CQUFhLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBQSxpQ0FBb0IsRUFBQyxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsV0FBVyxFQUFFO1FBQ2QsSUFBTSxHQUFHLEdBQUcsSUFBQSxpQ0FBb0IsRUFBQyxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1RSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUEsaUNBQW9CLEVBQUMsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBQSxvQkFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBRUgsK0NBQStDO0lBQy9DLDZEQUE2RDtJQUM3RCxFQUFFLENBQUMsWUFBWSxFQUFFO1FBQ2YsSUFBQSw2QkFBZ0IsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVyQixJQUFNLElBQUksR0FBRyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxRixJQUFNLElBQUksR0FBRyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RixJQUFNLElBQUksR0FBRyxJQUFBLGlDQUFvQixFQUFDLElBQUEsb0JBQWEsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFBLG9CQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RSxJQUFBLDZCQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSortedNumberSet = exports.uniquify = exports.addAll = exports.removeAll = void 0;
var list_1 = require("./list");
var list_2 = require("./list");
/**
 * Updates vals1 to not contain any of the numbers in vals2. Both arrays are
 * assumed to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = without(vals1_0, vals2)
 */
function removeAll(vals1, vals2) {
    var i = 0;
    var j = 0;
    var k = 0;
    // Inv: vals1[0 .. k-1] = without(vals1_0[0 .. i-1], vals2) and
    //      vals1[k .. n-1] = vals1_0[k .. n-1] and
    //      vals2[j-1] < vals1[i] (if these indexes exist)
    while (i !== vals1.length) {
        if ((j === vals2.length) || (vals1[i] < vals2[j])) {
            vals1[k] = vals1[i];
            i = i + 1;
            k = k + 1;
        }
        else if (vals1[i] > vals2[j]) {
            j = j + 1;
        }
        else {
            i = i + 1;
            j = j + 1;
        }
    }
    // Inv: vals1[0 .. k-1] = without(vals1_0, vals2)
    while (vals1.length !== k)
        vals1.pop();
}
exports.removeAll = removeAll;
/**
 * Updates vals1 to contain all of the numbers in vals2. Both arrays are assumed
 * to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = with(vals1_0, vals2)
 */
function addAll(vals1, vals2) {
    var i = 0;
    var j = 0;
    var vals3 = [];
    // Inv: vals3 = with(vals1[0 .. i-1], vals2) and
    //      vals2[j-1] < vals1[i] (if these indexes exist)
    while (i !== vals1.length || (j !== vals2.length)) {
        if ((j === vals2.length) || (vals1[i] < vals2[j])) {
            vals3.push(vals1[i]);
            i = i + 1;
        }
        else if ((i === vals1.length) || vals1[i] > vals2[j]) {
            vals3.push(vals2[j]);
            j = j + 1;
        }
        else {
            vals3.push(vals1[i]);
            i = i + 1;
            j = j + 1;
        }
    }
    // Now have vals3 = with(vals1_0, vals2)
    if (vals3.length < vals1.length)
        throw new Error('impossible');
    // Inv: vals1[0 .. k-1] = vals3[0 .. k-1]
    for (var k = 0; k < vals1.length; k++)
        vals1[k] = vals3[k];
    // Inv: vals1[0 .. vals1.length-1] = vals3[0 .. vals1.length-1]
    while (vals1.length !== vals3.length)
        vals1.push(vals3[vals1.length]);
}
exports.addAll = addAll;
/**
 * Removes any duplicate elements from the given sorted array of numbers.
 * @param L a sorted array of numbers
 * @modifies L
 * @effects L[0] < L[1] < ... < L[L.length-1] and
 *     contains(L, x) = contains(L_0, x) for any x
 */
function uniquify(L) {
    if (L.length === 0)
        return;
    var i = 1;
    var k = 1;
    // Inv: L[0 .. k-1] = uniquify(L_0[0 .. i-1]) and
    //      L[k .. n-1] = L_0[k .. n-1] and
    //      L[i-1] = L[k-1]
    while (i !== L.length) {
        if (L[k - 1] < L[i]) {
            L[k] = L[i];
            k = k + 1;
            i = i + 1;
        }
        else if (L[k - 1] === L[i]) {
            i++;
        }
        else {
            return undefined;
        }
    }
    // TODO (3a): implement the rest
    while (k < i) {
        k++;
        L.pop();
    }
}
exports.uniquify = uniquify;
// TODO (3b): add class SortedNumberSet
/**
 * Implements a sorted list of distinct numbers that have useful operations to retrieve information of the list or to modify it
 */
var SortedNumberSet = /** @class */ (function () {
    // makes obj = uniquify(sort(set))
    function SortedNumberSet(set) {
        var _this = this;
        this.removeAll = function (other_set) {
            var a1 = _this.set.slice(0);
            var a2 = other_set.set.slice(0);
            var other_comp = other_set.comp;
            if (_this.comp === false && other_comp === false) {
                removeAll(_this.set, other_set.set);
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
            }
            else if (_this.comp === false && other_comp === true) {
                removeAll(a1, a2);
                removeAll(_this.set, a1);
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
                // [1, 2, 3           ] [... 0, 1, 2, 6, ...] => [1, 2]
            }
            else if (_this.comp === true && other_comp === true) {
                removeAll(a2, a1);
                _this.set = a2;
                _this.complement();
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
                // [... 0, 4, 5, 6 ...] [... 0, 1, 2, 6, ...] => [... 0, 3, ...]
            }
            else {
                removeAll(_this.set, a2);
                addAll(_this.set, a2);
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
                // [... 0, 4, 5, 6 ...] [3, 4, 5            ] => [... 0, 3, ...]
            }
        };
        this.addAll = function (other_set) {
            var a1 = _this.set.slice(0);
            var a2 = other_set.set.slice(0);
            var a3 = other_set.set.slice(0);
            var other_comp = other_set.comp;
            if (_this.comp === false && other_comp === false) {
                addAll(_this.set, other_set.set);
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
            }
            else if (_this.comp === false && other_comp === true) {
                removeAll(a2, a1);
                _this.set = a2;
                _this.complement();
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
                // [1, 2, 3           ] [... 0, 1, 2, 6, ...] => [1, 2, 3, 4, 5]
            }
            else if (_this.comp === true && other_comp === true) {
                removeAll(a2, a1);
                removeAll(a3, a2);
                _this.set = a3;
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
                // [... 0, 4, 5, 6 ...] [... 0, 1, 2, 6, ...] => [... 0, 6, ...]
            }
            else {
                removeAll(_this.set, a2);
                // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
                // [... 0, 4, 5, 6 ...] [3, 4, 5            ] => [... 0, 6, ...]
            }
        };
        this.getNumbers = function (a, b) {
            if (_this.comp === false) {
                return (0, list_1.explode_array)(_this.set);
            }
            else {
                var c_1 = a;
                var result = Array.from({ length: b + 1 - a }, function (_, a) { return a + c_1; }); // sorted array of all elements in range from a to b, inclusive
                var i = 0;
                // {{ Inv: elements of result in range 0..i-1 can't be found in this.set }}
                while (i < b + 1 - a) {
                    if (_this.set.includes(result[i])) { // removes result[i] from result array if result[i] is in this.set
                        result.splice(i, 1); // note that after remove, index is unchanged
                    }
                    else {
                        i++;
                    }
                }
                return (0, list_1.explode_array)(result);
            }
        };
        this.complement = function () {
            _this.comp = !_this.comp;
        };
        this.comp = false;
        this.set = set.sort(compareNumbers);
        uniquify(this.set);
    }
    return SortedNumberSet;
}());
function compareNumbers(a, b) {
    return a - b;
}
// TODO (3c): add function makeSortedNumberSet
/**
 * Make a sorted number set
 * @param vals list of values to be make
 * @returns instance of SortedNumberSet
 */
function makeSortedNumberSet(vals) {
    return new SortedNumberSet((0, list_2.compact_list)(vals));
}
exports.makeSortedNumberSet = makeSortedNumberSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVkX3NldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zb3J0ZWRfc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLCtCQUE2QztBQUM3QywrQkFBc0M7QUFFdEM7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLFNBQVMsQ0FBQyxLQUFlLEVBQUUsS0FBZTtJQUN4RCxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQyxHQUFXLENBQUMsQ0FBQztJQUVsQiwrREFBK0Q7SUFDL0QsK0NBQStDO0lBQy9DLHNEQUFzRDtJQUN0RCxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pELEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDVixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNYO2FBQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ1g7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDWDtLQUNGO0lBRUQsaURBQWlEO0lBQ2pELE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoQixDQUFDO0FBeEJELDhCQXdCQztBQUVE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
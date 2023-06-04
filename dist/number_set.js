"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complement = exports.makeBooleanNumberSet = exports.setMaxForTesting = exports.MAX = void 0;
var list_1 = require("./list");
/** Maximum number that can be represented in a set. */
exports.MAX = 100;
// Change the value of max in some tests (to keep the size reasonable)
function setMaxForTesting(max) {
    if (max < 1 || Math.round(max) !== max)
        throw new Error("invalid positive integer ".concat(max));
    exports.MAX = max;
}
exports.setMaxForTesting = setMaxForTesting;
// TODO (1b, 4b): add the class BooleanNumberSet
/**
 * Implements a set with useful operations to trieve information of the set or to modify it
 */
var BooleanNumberSet = /** @class */ (function () {
    // makes obj = set
    function BooleanNumberSet(set) {
        var _this = this;
        this.removeAll = function (other_set) {
            removeAll(_this.set, other_set.set);
        };
        this.addAll = function (other_set) {
            addAll(_this.set, other_set.set);
        };
        this.getNumbers = function (_, __) {
            return getNumbers(_this.set);
        };
        this.complement = function () {
            complement(_this.set);
        };
        this.set = set;
    }
    return BooleanNumberSet;
}());
/**
 * Returns the given list of numbers in a number set.
 * @param vals list of numbers to include in the set (and nothing else)
 * @requires every x in vals satisfies 1 <= x <= 100
 * @returns a set S such that S[x-1] === true iff x is in vals
 */
function makeBooleanNumberSet(vals) {
    // Start set out as the empty set.
    var set = new Array(exports.MAX + 1);
    for (var i = 0; i <= exports.MAX; i++)
        set[i] = false;
    // Inv: set indicates the presence of just the numbers we've skipped past
    while (vals !== list_1.nil) {
        if (vals.hd < 1 || exports.MAX < vals.hd)
            throw new Error("unsupported number ".concat(vals.hd, " (must be 1-").concat(exports.MAX, ")"));
        set[vals.hd] = true;
        vals = vals.tl;
    }
    return new BooleanNumberSet(set);
}
exports.makeBooleanNumberSet = makeBooleanNumberSet;
/**
 * Updates set1 to not include any numbers listed in set2.
 * @param set1 set from which to remove elements
 * @param set2 set of elements to remove from set1
 * @modifies set1
 * @result set1[x] = true iff set1_0[x] = true AND set2[x] = false
 */
function removeAll(set1, set2) {
    for (var i = 1; i <= exports.MAX; i++) {
        if (set2[i] === true)
            set1[i] = false;
    }
}
/**
 * Updates set1 to include all the numbers listed in set2.
 * @param set1 set to add elements to
 * @param set2 set of elements to add to set1
 * @modifies set1
 * @result set1[x] = true iff set1_0[x] = true OR set2[x] = true
 */
function addAll(set1, set2) {
    for (var i = 1; i <= exports.MAX; i++) {
        if (set2[i] === true)
            set1[i] = true;
    }
}
/**
 * Returns a list of the numbers present in the given set
 * @param set the set in question
 * @return a list L such that x is in L iff set[x] = true
 */
function getNumbers(set) {
    var vals = list_1.nil;
    for (var i = exports.MAX; i >= 1; i--) { // make it sorted, just for fun
        if (set[i] === true)
            vals = (0, list_1.cons)(i, vals);
    }
    return vals;
}
// TODO: Ignore this for now. Uncomment and use in part 4b
/**
 * Updates set to have the opposite set of numbers: all the numbers (between 1
 * and 100) that were not in the set passed in.
 * @param set Set to complement
 * @modifies set
 * @effects set[x] = not set_0[x]
 */
function complement(set) {
    for (var i = 1; i <= exports.MAX; i++) {
        set[i] = !set[i];
    }
}
exports.complement = complement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3NldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9udW1iZXJfc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUF5QztBQUV6Qyx1REFBdUQ7QUFDNUMsUUFBQSxHQUFHLEdBQVcsR0FBRyxDQUFDO0FBRTdCLHNFQUFzRTtBQUN0RSxTQUFnQixnQkFBZ0IsQ0FBQyxHQUFXO0lBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUc7UUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBNEIsR0FBRyxDQUFFLENBQUMsQ0FBQztJQUNyRCxXQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ1osQ0FBQztBQUpELDRDQUlDO0FBMENELGdEQUFnRDtBQUNoRDs7R0FFRztBQUNIO0lBSUUsa0JBQWtCO0lBQ2xCLDBCQUFZLEdBQWM7UUFBMUIsaUJBRUM7UUFFRCxjQUFTLEdBQUcsVUFBQyxTQUFvQjtZQUMvQixTQUFTLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRyxTQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQTtRQUVELFdBQU0sR0FBRyxVQUFDLFNBQW9CO1lBQzVCLE1BQU0sQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFHLFNBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFBO1FBRUQsZUFBVSxHQUFHLFVBQUMsQ0FBUyxFQUFFLEVBQVU7WUFDakMsT0FBTyxVQUFVLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQTtRQUVELGVBQVUsR0FBRztZQUNYLFVBQVUsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEIsQ0FBQyxDQUFBO1FBakJDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFpQkgsdUJBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixvQkFBb0IsQ0FBQyxJQUFrQjtJQUNyRCxrQ0FBa0M7SUFDbEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsV0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxXQUFHLEVBQUUsQ0FBQyxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFakIseUVBQXlFO0lBQ3pFLE9BQU8sSUFBSSxLQUFLLFVBQUcsRUFBRTtRQUNuQixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLFdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDZCQUFzQixJQUFJLENBQUMsRUFBRSx5QkFBZSxXQUFHLE1BQUcsQ0FBQyxDQUFDO1FBRXRFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFoQkQsb0RBZ0JDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBZSxFQUFFLElBQWU7SUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJO1lBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxNQUFNLENBQUMsSUFBZSxFQUFFLElBQWU7SUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJO1lBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsVUFBVSxDQUFDLEdBQWM7SUFDaEMsSUFBSSxJQUFJLEdBQWlCLFVBQUcsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLFdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUcsK0JBQStCO1FBQy9ELElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7WUFDakIsSUFBSSxHQUFHLElBQUEsV0FBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN4QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELDBEQUEwRDtBQUMxRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixVQUFVLENBQUMsR0FBYztJQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksV0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFKRCxnQ0FJQyJ9
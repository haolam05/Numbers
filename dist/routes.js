"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNumbers = void 0;
var list_1 = require("./list");
var query_1 = require("./query");
var eval_1 = require("./eval");
/**
 * Handles request for /find, which retrieves all the numbers matching the
 * description given.
 */
function findNumbers(req, res) {
    var text = first(req.query.text);
    if (text === undefined) {
        res.status(500).send('required argument "text" missing');
        return;
    }
    var query = undefined;
    try {
        query = (0, query_1.parse)((0, list_1.explode_array)((0, query_1.tokenize)(text)));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send('parse error: ' + err.message);
            return;
        }
        throw err;
    }
    var min = first(req.query.min);
    if (min === undefined) {
        res.status(500).send('required argument "min" missing');
        return;
    }
    var minVal = parseInt(min);
    if (isNaN(minVal)) {
        res.status(500).send('required argument "min" is not a valid number');
        return;
    }
    var max = first(req.query.max);
    if (max === undefined) {
        res.status(500).send('required argument "max" missing');
        return;
    }
    var maxVal = parseInt(max);
    if (isNaN(maxVal)) {
        res.status(500).send('required argument "max" is not a valid number');
        return;
    }
    // TODO (5f): once arbitrary ranges are supported, remove this if statement
    //            and switch to the ones below.
    // if (minVal !== 1 || maxVal !== 100) {
    //   res.status(500).send('the only supported min-max range is 1-100');
    //   return;
    // }
    if (maxVal < minVal) {
        res.status(500).send("min (".concat(minVal, ") should be smaller than max $(").concat(maxVal, ")"));
        return;
    }
    else if (maxVal - minVal > 1e6) {
        res.status(500).send("min-max range must be smaller than 1m (not ".concat(maxVal - minVal, ")"));
        return;
    }
    var results = (0, eval_1.evaluate)(query, minVal, maxVal);
    // TODO: - (1e) change the following to use .getNumbers()
    //       - (5e): add range params minVal, maxVal to following .getNumbers() call
    res.json({ results: (0, list_1.compact_list)(results.getNumbers(minVal, maxVal)) });
}
exports.findNumbers = findNumbers;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param) {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBcUQ7QUFDckQsaUNBQWlEO0FBQ2pELCtCQUFrQztBQUdsQzs7O0dBR0c7QUFDSCxTQUFnQixXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDckQsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDekQsT0FBTztLQUNSO0lBRUQsSUFBSSxLQUFLLEdBQW9CLFNBQVMsQ0FBQztJQUN2QyxJQUFJO1FBQ0YsS0FBSyxHQUFHLElBQUEsYUFBSyxFQUFDLElBQUEsb0JBQWEsRUFBQyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7WUFDeEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxPQUFPO1NBQ1I7UUFDRCxNQUFNLEdBQUcsQ0FBQztLQUNYO0lBRUQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDeEQsT0FBTztLQUNSO0lBRUQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDdEUsT0FBTztLQUNSO0lBRUQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDeEQsT0FBTztLQUNSO0lBRUQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDdEUsT0FBTztLQUNSO0lBRUQsMkVBQTJFO0lBQzNFLDJDQUEyQztJQUMzQyx3Q0FBd0M7SUFDeEMsdUVBQXVFO0lBQ3ZFLFlBQVk7SUFDWixJQUFJO0lBQ0osSUFBSSxNQUFNLEdBQUcsTUFBTSxFQUFFO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQVEsTUFBTSw0Q0FBa0MsTUFBTSxNQUFHLENBQUMsQ0FBQztRQUNoRixPQUFPO0tBQ1A7U0FBTSxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHFEQUE4QyxNQUFNLEdBQUMsTUFBTSxNQUFHLENBQUMsQ0FBQztRQUNyRixPQUFPO0tBQ1A7SUFFRCxJQUFNLE9BQU8sR0FBRyxJQUFBLGVBQVEsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELHlEQUF5RDtJQUN6RCxnRkFBZ0Y7SUFDaEYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFBLG1CQUFZLEVBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQTVERCxrQ0E0REM7QUFHRCx3RUFBd0U7QUFDeEUsNEVBQTRFO0FBQzVFLG1EQUFtRDtBQUNuRCxTQUFTLEtBQUssQ0FBQyxLQUFVO0lBQ3ZCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyJ9
"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePrimary = exports.parseConjunction = exports.parseDisjunction = exports.parse = exports.tokenize = exports.or = exports.and = exports.not = exports.fibonacci = exports.prime = exports.even = void 0;
var list_1 = require("./list");
exports.even = "even";
exports.prime = "prime";
exports.fibonacci = "fibonacci";
function not(arg) {
    return { kind: "not", arg: arg };
}
exports.not = not;
function and(left, right) {
    return { kind: "and", left: left, right: right };
}
exports.and = and;
function or(left, right) {
    return { kind: "or", left: left, right: right };
}
exports.or = or;
/**
 * Returns the non-space tokens in the given string, where tokens can be a
 * subsequence of spaces or of letters or the single characters "(" and ")".
 * @param str string to split into tokens
 * @returns the result of splitting words (only) between characters of different
 *     types (space, letter, "(", and ")") and then dropping the space words
 */
function tokenize(str) {
    if (str.length === 0)
        return [];
    var tokens = [];
    var i = 0;
    var j = 1;
    // Inv: tokens ++ drop-space([str[i .. j-1]]) = tokenize(str[0 .. j-1]),
    //      where drop-space([" "]) := [] and drop-space([w]) := [w] (w != " ").
    while (j !== str.length) {
        if (tokenType(str[j]) === tokenType(str[i])) {
            j = j + 1; // continue the current token
        }
        else {
            if (tokenType(str[i]) !== 1)
                tokens.push(str.substring(i, j)); // add token
            i = j; // start a new token
            j = j + 1;
        }
    }
    if (tokenType(str[i]) !== 1)
        tokens.push(str.substring(i, j)); // add last token
    return tokens;
}
exports.tokenize = tokenize;
// Determines if the given character is a space, "(", ")", or a letter.
function tokenType(ch) {
    if (ch.trim() === '') {
        return 1; // space
    }
    else if (ch === "(") {
        return 2; // "("
    }
    else if (ch === ")") {
        return 3; // ")"
    }
    else {
        return 4; // letter
    }
}
/**
 * Turns a string into the query it describes
 * @param text Textual description of the query
 * @returns the tree that matches that text according to the grammar:
 *   query -> disjunction
 *   disjunction -> conjunction | conjunction "or" disjunction
 *   conjunction -> primary | primary "and" conjunction
 *   primary -> "even" | "prime" | "fibonacci" | "not" primary | "(" query ")"
 */
function parse(words) {
    var _a = __read(parseDisjunction(words), 2), query = _a[0], rest = _a[1];
    if (rest === list_1.nil) {
        return query;
    }
    else {
        var extra = (0, list_1.compact_list)(rest).join(" ");
        throw new Error("unexpected extra text after query: \"".concat(extra, "\""));
    }
}
exports.parse = parse;
// Parses a disjunction per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
function parseDisjunction(words) {
    if (words === list_1.nil) {
        throw new Error("unexpectedly reached the end of the text (expecting a disjunction)");
    }
    else {
        var _a = __read(parseConjunction(words), 2), left = _a[0], rest = _a[1];
        if (rest !== list_1.nil && rest.hd === "or") {
            var _b = __read(parseDisjunction(rest.tl), 2), right = _b[0], after_1 = _b[1];
            return [or(left, right), after_1];
        }
        else {
            return [left, rest];
        }
    }
}
exports.parseDisjunction = parseDisjunction;
// Parses a conjunction per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
function parseConjunction(words) {
    if (words === list_1.nil) {
        throw new Error("unexpectedly reached the end of the text (expecting a conjunction)");
    }
    else {
        var _a = __read(parsePrimary(words), 2), left = _a[0], rest = _a[1];
        if (rest !== list_1.nil && rest.hd === "and") {
            var _b = __read(parseConjunction(rest.tl), 2), right = _b[0], after_2 = _b[1];
            return [and(left, right), after_2];
        }
        else {
            return [left, rest];
        }
    }
}
exports.parseConjunction = parseConjunction;
// Parses a primary per the grammar rule above. Returns the query and the
// remaining text that was not parsed.
function parsePrimary(words) {
    if (words === list_1.nil) {
        throw new Error("unexpectedly reached the end of the text (expecting a conjunction)");
    }
    else if (words.hd === "even") {
        return [exports.even, words.tl];
    }
    else if (words.hd === "prime") {
        return [exports.prime, words.tl];
    }
    else if (words.hd === "fibonacci") {
        return [exports.fibonacci, words.tl];
    }
    else if (words.hd === "not") {
        var _a = __read(parsePrimary(words.tl), 2), arg = _a[0], rest = _a[1];
        return [not(arg), rest];
    }
    else if (words.hd === "(") {
        var _b = __read(parseDisjunction(words.tl), 2), query = _b[0], rest = _b[1];
        if (rest === list_1.nil) {
            throw new Error("unexpectedly reached the end of the text (expecting \")\")");
        }
        else if (rest.hd !== ")") {
            throw new Error("expecting \")\" not \"".concat(rest.hd, "\""));
        }
        else {
            return [query, rest.tl];
        }
    }
    else {
        throw new Error("unexpectedl word \"".concat(words.hd, "\" (expecting a primary)"));
    }
}
exports.parsePrimary = parsePrimary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFpRDtBQVVwQyxRQUFBLElBQUksR0FBVSxNQUFNLENBQUM7QUFDckIsUUFBQSxLQUFLLEdBQVUsT0FBTyxDQUFDO0FBQ3ZCLFFBQUEsU0FBUyxHQUFVLFdBQVcsQ0FBQztBQUU1QyxTQUFnQixHQUFHLENBQUMsR0FBVTtJQUM1QixPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEtBQUEsRUFBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCxrQkFFQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxJQUFXLEVBQUUsS0FBWTtJQUMzQyxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDO0FBQ3BDLENBQUM7QUFGRCxrQkFFQztBQUVELFNBQWdCLEVBQUUsQ0FBQyxJQUFXLEVBQUUsS0FBWTtJQUMxQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxnQkFFQztBQUdEOzs7Ozs7R0FNRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXO0lBQ2xDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBRVosSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVWLHdFQUF3RTtJQUN4RSw0RUFBNEU7SUFDNUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUN2QixJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENB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
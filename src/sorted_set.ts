import { NumberSet } from "./number_set";
import { List, explode_array } from "./list";
import { compact_list } from "./list";

/**
 * Updates vals1 to not contain any of the numbers in vals2. Both arrays are
 * assumed to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = without(vals1_0, vals2)
 */
export function removeAll(vals1: number[], vals2: number[]): void {
  let i: number = 0;
  let j: number = 0;
  let k: number = 0;

  // Inv: vals1[0 .. k-1] = without(vals1_0[0 .. i-1], vals2) and
  //      vals1[k .. n-1] = vals1_0[k .. n-1] and
  //      vals2[j-1] < vals1[i] (if these indexes exist)
  while (i !== vals1.length) {
    if ((j === vals2.length) || (vals1[i] < vals2[j])) {
      vals1[k] = vals1[i];
      i = i + 1;
      k = k + 1;
    } else if (vals1[i] > vals2[j]) {
      j = j + 1;
    } else {
      i = i + 1;
      j = j + 1;
    }
  }

  // Inv: vals1[0 .. k-1] = without(vals1_0, vals2)
  while (vals1.length !== k)
    vals1.pop();
}

/**
 * Updates vals1 to contain all of the numbers in vals2. Both arrays are assumed
 * to be sorted and contain only distinct numbers.
 * @param vals1 the first sorted array of distinct integers
 * @param vals2 the second sorted array of distinct integers
 * @modifies vals1
 * @effects vals1 = with(vals1_0, vals2)
 */
export function addAll(vals1: number[], vals2: number[]): void {
  let i: number = 0;
  let j: number = 0;

  const vals3: number[] = [];

  // Inv: vals3 = with(vals1[0 .. i-1], vals2) and
  //      vals2[j-1] < vals1[i] (if these indexes exist)
  while (i !== vals1.length || (j !== vals2.length)) {
    if ((j === vals2.length) || (vals1[i] < vals2[j])) {
      vals3.push(vals1[i]);
      i = i + 1;
    } else if ((i === vals1.length) || vals1[i] > vals2[j]) {
      vals3.push(vals2[j]);
      j = j + 1;
    } else {
      vals3.push(vals1[i]);
      i = i + 1;
      j = j + 1;
    }
  }

  // Now have vals3 = with(vals1_0, vals2)
  if (vals3.length < vals1.length)
    throw new Error('impossible');

  // Inv: vals1[0 .. k-1] = vals3[0 .. k-1]
  for (let k = 0; k < vals1.length; k++)
    vals1[k] = vals3[k];

  // Inv: vals1[0 .. vals1.length-1] = vals3[0 .. vals1.length-1]
  while (vals1.length !== vals3.length)
    vals1.push(vals3[vals1.length]);
}


/**
 * Removes any duplicate elements from the given sorted array of numbers.
 * @param L a sorted array of numbers
 * @modifies L
 * @effects L[0] < L[1] < ... < L[L.length-1] and
 *     contains(L, x) = contains(L_0, x) for any x
 */
export function uniquify(L: number[]): void {
  if (L.length === 0)
    return;

  let i = 1;
  let k = 1;

  // Inv: L[0 .. k-1] = uniquify(L_0[0 .. i-1]) and
  //      L[k .. n-1] = L_0[k .. n-1] and
  //      L[i-1] = L[k-1]
  while (i !== L.length) {
    if (L[k - 1] < L[i]) {
      L[k] = L[i];
      k = k + 1;
      i = i + 1;
    } else if (L[k - 1] === L[i]) {
      i++
    } else {
      return undefined;
    }
  }

  // TODO (3a): implement the rest
  while (k < i) {
    k++;
    L.pop();
  }
}


// TODO (3b): add class SortedNumberSet
/**
 * Implements a sorted list of distinct numbers that have useful operations to retrieve information of the list or to modify it
 */
class SortedNumberSet implements NumberSet {
  // AF: if this.comp = true
  //        obj = this.set
  //     else
  //        obj = complement(this.set)  // contains(obj0, obj[x]) = false, where x = 0..obj.length-1;  (there is no element in obj that can be found in the initial obj0)
  // RI: contains(obj, x) = contains(uniquify(obj), x), where x is in obj
  set: number[];
  comp: boolean;

  // makes obj = uniquify(sort(set))
  constructor(set: number[]) {
    this.comp = false;
    this.set = set.sort(compareNumbers);
    uniquify(this.set);
  }

  removeAll = (other_set: NumberSet): void => {
    let a1 = this.set.slice(0);
    let a2 = (other_set as SortedNumberSet).set.slice(0);
    const other_comp = (other_set as SortedNumberSet).comp;
    if (this.comp === false && other_comp === false) {
      removeAll(this.set, (other_set as SortedNumberSet).set);
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
    } else if (this.comp === false && other_comp === true) {
      removeAll(a1, a2);
      removeAll(this.set, a1);
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
      // [1, 2, 3           ] [... 0, 1, 2, 6, ...] => [1, 2]
    } else if (this.comp === true && other_comp === true) {
      removeAll(a2, a1);
      this.set = a2;
      this.complement();
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
      // [... 0, 4, 5, 6 ...] [... 0, 1, 2, 6, ...] => [... 0, 3, ...]
    } else {
      removeAll(this.set, a2);
      addAll(this.set, a2);
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2]
      // [... 0, 4, 5, 6 ...] [3, 4, 5            ] => [... 0, 3, ...]
    }
  };

  addAll = (other_set: NumberSet): void => {
    let a1 = this.set.slice(0);
    let a2 = (other_set as SortedNumberSet).set.slice(0);
    let a3 = (other_set as SortedNumberSet).set.slice(0);
    const other_comp = (other_set as SortedNumberSet).comp;
    if (this.comp === false && other_comp === false) {
      addAll(this.set, (other_set as SortedNumberSet).set);
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
    } else if (this.comp === false && other_comp === true) {
      removeAll(a2, a1);
      this.set = a2;
      this.complement()
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
      // [1, 2, 3           ] [... 0, 1, 2, 6, ...] => [1, 2, 3, 4, 5]
    } else if (this.comp === true && other_comp === true) {
      removeAll(a2, a1);
      removeAll(a3, a2);
      this.set = a3;
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
      // [... 0, 4, 5, 6 ...] [... 0, 1, 2, 6, ...] => [... 0, 6, ...]
    } else {
      removeAll(this.set, a2);
      // [1, 2, 3           ] [3, 4, 5            ] => [1, 2, 3, 4, 5]
      // [... 0, 4, 5, 6 ...] [3, 4, 5            ] => [... 0, 6, ...]
    }
  }

  getNumbers = (a: number, b: number): List<number> => {
    if (this.comp === false) {
      return explode_array(this.set);
    } else {
      const c = a;
      let result: number[] = Array.from({ length: b + 1 - a }, (_, a) => a + c)   // sorted array of all elements in range from a to b, inclusive
      let i = 0;
      // {{ Inv: elements of result in range 0..i-1 can't be found in this.set }}
      while (i < b + 1 - a) {
        if (this.set.includes(result[i])) { // removes result[i] from result array if result[i] is in this.set
          result.splice(i, 1);  // note that after remove, index is unchanged
        } else {
          i++;
        }
      }
      return explode_array(result);
    }
  }

  complement = (): void => {
    this.comp = !this.comp;
  }
}

function compareNumbers(a: number, b: number) {
  return a - b;
}

// TODO (3c): add function makeSortedNumberSet
/**
 * Make a sorted number set
 * @param vals list of values to be make
 * @returns instance of SortedNumberSet
 */
export function makeSortedNumberSet(vals: List<number>): NumberSet {
  return new SortedNumberSet(compact_list(vals));
}

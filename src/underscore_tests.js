/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n === undefined) {
      return array[0];
    } else {
      array.splice(n, array.length + 1);
      return array;
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length -1];
    } else {
      array.splice(0, array.length - n)
      return array;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var inArray = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        inArray = true;
        return i;
      }
    }
    if (inArray !== false) {
      return inArray;
    } else {
      return -1;
    }
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var holder = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])) {
          holder.push(collection[i]);
        }
      }
      return holder;
    } else {
      for (var key in collection) {
        if (iterator(collection[key])) {
          holder.push(collection[key]);
        }
      }
      return holder;
    }
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var holder = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (!iterator(collection[i])) {
          holder.push(collection[i]);
        }
      }
      return holder;
    } else {
      for (var key in collection) {
        if (!iterator(collection[ key ])) {
          holder.push(collection[ key ]);
        }
      }
    }
    return holder;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(arr) {
    var i, j, cur, found;
    for (i = arr.length - 1; i >= 0; i--) {
        cur = arr[i];
        found = false;
        for (j = i - 1; !found && j >= 0; j--) {
            if (cur === arr[j]) {
                if (i !== j) {
                    arr.splice(i, 1);
                }
                found = true;
            }
        }
    }
    return arr;    
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var holder = [];
    for (var i = 0; i < array.length; i++) {
      holder.push(iterator(array[i]));
    }
    return holder;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var selectedReturn = [];
    for (var i = 0; i < array.length; i++) {
      var tempObj = array[i];
      for (var key in tempObj) {
        if (key === propertyName) {
          selectedReturn.push(tempObj[key]);
        }
      }
    }
    return selectedReturn;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof methodName === "string") {
        for (var i = 0; i < list.length; i++) {
          list[i][methodName](args);
        }
      } else if (typeof methodName  === "function") {
        for (var i = 0; i < list.length; i++) {
          methodName.call(list[i]);
        }
      }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var previousValue = initialValue || 0;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        previousValue = iterator(previousValue, collection[i]);
      }
    } else {
      for (var key in collection) {
        previousValue = iterator(previousValue, collection[ key ]);
      }
    }
    return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var isNotIn = false;
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          return true;
        }
      }
    } else {
      for (var key in collection) {
        if (collection[ key ] === target) {
          return true;
        }
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!iterator) {
        if (Array.isArray(collection)) {
          for (var i = 0; i < collection.length; i++) {
            if (!collection[i]) {
              return false;
            }
          }
        } else {
          for (var key in collection) {
            if (!collection[ key ]) {
              return false;
            }
          }
        }
        return true;

      } else {

        if (Array.isArray(collection)) {
          for (var i = 0; i < collection.length; i++) {
            if (!iterator(collection[i])) {
              return false;
            }
          }
        } else {
          for (var key in collection) {
            if (!iterator(collection[ key ])) {
              return false;
            }
          }
        }
        return true;
      }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!iterator) {
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          if (collection[i]) {
            return true;
          }
        }
      } else {
        for (var key in collection) {
          if (collection[ key ]) {
            return true;
          }
        }
      }
      return false;

    } else {

      // if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
          if (iterator(collection[i])) {
            return true;
          }
        }
      // } else {
      //   for (var key in collection) {
      //     if (iterator(collection[ key ]));
      //     return true;
      //   }
      // }
      return false;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
      var ran = false, memo;
      return function() {
        if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        func = null;
        return memo;
      }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    setTimeout(func, wait, x, y, z);
  };



  // Shuffle an array.
  _.shuffle = function(arr) {
    return shuffled = function(){
      var array = arr;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
      };
    }

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < argument[i].length; j++) {
        zipped[j]
      }
    }
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    // var newArray = [];
    // var iLen = nestedArray.length;
    // for (var i = 0; i < iLen; i++) {
    //   var jLen = nestedArray[i].length;
    //   for (var j = 0; j < jLen; j++) {
    //     newArray.push(nestedArray[i][j]);
    //   }
    // }
    // return newArray;
    var merged = [];
    merged = concat.apply(merged, nestedArray);
  };
  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);

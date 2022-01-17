# es-type-checker v0.5.0

Want to check your types in Node.js simply with esNext features? If yes, then you are in the right place.

## Syntax from javascript Destructuring assignment

```js
        const argument = 'any string';

        ({ string: type } = argument.type), of(argument);
```
That's all type checked.

### More explanation.
```js
    const { property } = object; //This is normal desctructive assignment.
```
It's the same in other way.
```js
    let property;
    ({ property } = object);
```
When we change some detail, we will get this:
```js
    let size;
    ({ length: size } = object);
    // now variable size contains the length data of object
```
When we use object.type we get the proxy magic. Welcome to the source code if you need more details.

## One bad news!
For clean syntax, I need to use **global.type**. I'm still wondering how I can fix this. Avoid using a variable named **"type"** in your code.

## Full syntax
```
npm i es-type-checker -S
```
```js
import TypeChecker from 'es-type-checker';

const { is } = new TypeChecker();
const of = is;
```
For functions:
```js
function example(oneParameter) {
        const checkedParameter = is({ string: type } = oneParameter.type, oneParameter);
}

example('text'); // no Errors
example(1); // TypeError: Number is not a string

```
For classes:
```js
class Example {
    constructor(firstOption, secondOption, thirdOption) {
        this.firstOption = is({ string: type } = firstOption.type, firstOption);
        const useSecondOption = is({ string: type } = thirdOption.type, thirdOption);
        ({ string: type } = useSecondOption.type), of(useSecondOption); //only to check;
    }
}
```
If the variable isn't defined:
```js
function example(oneParameter) {
        const checkedParameter = is({ string: type } = oneParameter.type, oneParameter);
}

example();// TypeError: Cannot read properties of undefined (reading 'type')

```
If you want to check for undefined or null use the following syntax:
```js
        ({ undefined: type } = undefined?.type ?? true), of(undefined);

        ({ null: type } = null?.type ?? 'any operand, I use true for code readability'), of(null);

        // maybe you want to use like this
        ({ undefined: type } = undefined?.type ?? Error), of(undefined);
```
More complicated syntax:
```js
    classMathod(object) {
        const { url, query, body, isHttps, validator } = object;

        ({ notEmpty: type } = url.type), of(url);
        ({ notEmpty: type } = query.type), of(query);
        ({ empty: type } = body.type), of(body);

        this.url = is({ string: type } = url.type, url);
        this.query = is({ array: type } = query.type, query);
        this.body = is({ object: type } = body.type, body);

        ({ boolean: type } = isHttps.type), of(isHttps);
        ({ function: type } = validator.type), of(validator);
    
        ... other code
    }
```
List of all supported types with syntax examples:
```js
        ({ string: type } = string_.type), of(string_);
        ({ String: type } = string_.type), of(string_);
        ({ Number: type } = number_.type), of(number_);
        ({ number: type } = number_.type), of(number_);
        ({ boolean: type } = boolean_.type), of(boolean_);
        ({ Boolean: type } = boolean_.type), of(boolean_);
        ({ symbol: type } = symbol_.type), of(symbol_);
        ({ Symbol: type } = symbol_.type), of(symbol_);
        ({ function: type } = function_.type), of(function_);
        ({ Function: type } = function_.type), of(function_);
        ({ bigint: type } = bigInt_.type), of(bigInt_);
        ({ BigInt: type } = bigInt_.type), of(bigInt_);
        ({ undefined: type } = undefined_?.type ?? true), of(undefined_);
        ({ null: type } = null_?.type ?? true), of(null_);
        ({ Array: type } = array_.type), of(array_);
        ({ array: type } = array_.type), of(array_);
        ({ date: type } = date_.type), of(date_);
        ({ Date: type } = date_.type), of(date_);
        ({ object: type } = object_.type), of(object_);
        ({ Object: type } = object_.type), of(object_);
        ({ Set: type } = set_.type), of(set_);
        ({ set: type } = set_.type), of(set_);
        ({ Map: type } = map_.type), of(map_);
        ({ map: type } = map_.type), of(map_);
        ({ WeakSet: type } = weakSet_.type), of(weakSet_);
        ({ weakset: type } = weakSet_.type), of(weakSet_);
        ({ WeakMap: type } = weakMap_.type), of(weakMap_);
        ({ weakmap: type } = weakMap_.type), of(weakMap_);
        ({ WeakRef: type } = weakRef_.type), of(weakRef_);
        ({ weakref: type } = weakRef_.type), of(weakRef_);
        ({ RegExp: type } = regExp_.type), of(regExp_);
        ({ regexp: type } = regExp_.type), of(regExp_);
        ({ Error: type } = error_.type), of(error_);
        ({ error: type } = error_.type), of(error_);
        ({ RangeError: type } = rangeError_.type), of(rangeError_);
        ({ rangeerror: type } = rangeError_.type), of(rangeError_);
        ({ ReferenceError: type } = referenceError_.type), of(referenceError_);
        ({ referenceerror: type } = referenceError_.type), of(referenceError_);
        ({ SyntaxError: type } = syntaxError_.type), of(syntaxError_);
        ({ syntaxerror: type } = syntaxError_.type), of(syntaxError_);
        ({ TypeError: type } = typeError_.type), of(typeError_);
        ({ typeerror: type } = typeError_.type), of(typeError_);
        ({ Buffer: type } = buffer_.type), of(buffer_);
        ({ buffer: type } = buffer_.type), of(buffer_);
        ({ Promise: type } = promise_.type), of(promise_);
        ({ promise: type } = promise_.type), of(promise_);
        ({ JSON: type } = json_.type), of(json_);
        ({ json: type } = json_.type), of(json_);
        ({ JSON5: type } = json5_.type), of(json5_);
        ({ json5: type } = json5_.type), of(json5_);
        ({ StrictTypeChecker: type } = strictTypeChecker_.class), of(strictTypeChecker_);
        ({ StrictTypeChecker: type } = StrictTypeChecker.class), of(StrictTypeChecker);
        ({ empty: type } = string_.type), of(string_);
        ({ empty: type } = array_.type), of(array_);
        ({ empty: type } = object_.type), of(object_);
        ({ empty: type } = set_.type), of(set_);
        ({ empty: type } = map_.type), of(map_);
        ({ empty: type } = weakSet_.type), of(weakSet_);
        ({ empty: type } = weakMap_.type), of(weakMap_);
        ({ empty: type } = weakRef_.type), of(weakRef_);
        ({ notEmpty: type } = string_.type), of('string_');
        ({ notEmpty: type } = array_.type), of([array_]);
        ({ notEmpty: type } = object_.type), of({object_: 1});
        ({ notEmpty: type } = set_.type), of(new Set().add(1));
        ({ notEmpty: type } = map_.type), of(new Map().set('a', 1));
        ({ notEmpty: type } = weakSet_.type), of(weakSet_.add(object_));
        ({ notEmpty: type } = weakMap_.type), of(weakMap_.set(object_, 1));
        ({ notEmpty: type } = weakRef_.type), of(new WeakRef({t:1}));
```
##### No dependencies except of json5, pure javascript code. No selfish syntax, if you know javascript you can write code without any challenges.


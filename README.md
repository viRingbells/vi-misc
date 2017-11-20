# vi-misc

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

A set of utils...

# misc.function
Utils for functions

* function.once(...func_list) - make sure the given functions will not be executed more than onece.
* function.limit(func_list, options) - make sure the given functions will be executed more than a certain count.

# misc.number
The number utils

* number.th - Append 'th' on a number.

# misc.object
Utils for objects.

* clone(object) - Deep clone
* each(object, handler) - Apply handlers for each property of the object.
* hasByKey(object, ...keys) - Test if object.xxx.xxx.xxx exists, which xxx,xxx,xxx as just the param 'keys'
* setByKeys(object, value, ...keys)
* getByKeys(object, value, ...keys)
  * This is supposed to be used when keys are dynamic and uncertain. In other cases, use object.xx.xx.xx directly.

# misc.path
The path utils

* path.root - returns the app root, which is the directory of main module file.
* path.absolute(target) - make target into absolute form and return.
* path.split(target) - split target into array.

# misc.async
Promisify with bluebird

* all(target, options) - Promisify all method for callback(error, result) like cases.
* catchError(promise) - Catch and return the error the promise throws. Otherwise returns null.

# misc.time
The time utils

* time.format - format time, `time.format('YYYY-MM-DD HH:II:SS')`.


[npm-image]: https://img.shields.io/npm/v/vi-misc.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/vi-misc
[travis-image]: https://img.shields.io/travis/viRingbells/vi-misc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/viRingbells/vi-misc
[coveralls-image]: https://img.shields.io/codecov/c/github/viRingbells/vi-misc.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/viRingbells/vi-misc?branch=master

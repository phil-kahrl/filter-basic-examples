const arccore = require("@encapsule/arccore");

// The most minimal filter
let factoryResponse = arccore.filter.create({
    operationID: "demo" // either "demo" or a 22 character string is allowed.
});

console.log(factoryResponse.result.request());
// { error: null, result: undefined }

// A Filter that accepts a single optional string with a default value

factoryResponse = arccore.filter.create({
    operationID: "demo",
    // A directive that says to accept a string as input and use a default value of "foo" if it is not present
    inputFilterSpec: {
        ____accept: "jsString",
        ____defaultValue: "foo"
    }
});

// Call the request() functio without a string - this will return the default value
console.log(factoryResponse.result.request());
// { error: null, result: 'foo' }

// pass in a value
console.log(factoryResponse.result.request("bar"));
// { error: null, result: 'bar' }

// Add a body function to transform the input
factoryResponse = arccore.filter.create({
    operationID: "demo",
    // A directive that says to accept a string as input and use a default value of "foo" if it is not present
    inputFilterSpec: {
        ____accept: "jsString",
        ____defaultValue: "foo"
    },
    bodyFunction: (request_) => {return {result: request_ + "BAZ"}},
});
console.log(factoryResponse.result.request());
//{ error: null, result: 'fooBAZ' }

// The body function must include a "result" or "error" object, or an error will be returned.
factoryResponse = arccore.filter.create({
    operationID: "demo",
    // A directive that says to accept a string as input and use a default value of "foo" if it is not present
    inputFilterSpec: {
        ____accept: "jsString",
        ____defaultValue: "foo"
    },
    bodyFunction: (request_) => {return request_ + "BAZ"}, //This will cause an error because it is not inside a "result" object
});

console.log(factoryResponse.result.request());
//{error: "Filter [uiPixY9FTryO8Ix7yjoGWQ::unnamed] failed while verifying response signature of main operation. Error at path '~': Value of type 'jsString' not in allowed type set [jsObject].",result: null}



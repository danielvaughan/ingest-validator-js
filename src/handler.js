const runValidation = require("./validator");

module.exports.handleValidate = (event, context, callback) => {
    console.log("debug", "Received POST request.");
    console.log(JSON.stringify(event))

    let bodyJson = JSON.parse(event.body)
    let inputSchema = bodyJson.schema;
    let inputObject = bodyJson.object;

    let headers = {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    if (inputSchema && inputObject) {
        runValidation(inputSchema, inputObject).then((output) => {
            const response = {
                headers: headers,
                statusCode: 200,
                body: JSON.stringify(output)
            }
            callback(null, response)
        }).catch((error) => {
            const response = {
                headers: headers,
                statusCode: 500,
                body: JSON.stringify(error)
            }
            callback(null, response)
        });
    } else {
        let message = "Something is missing, both schema and object are required to execute validation.";
        console.log("info", message);
        const response = {
            headers: headers,
            statusCode: 400,
            body: JSON.stringify(message)
        }
        callback(null, response)
    }
}
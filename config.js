var environments = {};
environments.staging = {
	"port" : 3000,
	"envName" : "Staging"
};
environments.production = {
	"port" : 5000,
	"envName" : "Production"
};
var chosenEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV : environments.staging;
module.exports = chosenEnvironment;
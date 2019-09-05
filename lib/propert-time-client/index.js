"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProperTimeClient = /** @class */ (function () {
    function ProperTimeClient(username, apiKey) {
        this.username = username;
        this.apiKey = apiKey;
    }
    ProperTimeClient.prototype.getClients = function () {
        return "Hello " + this.username + " - your apiKey is " + this.apiKey;
    };
    return ProperTimeClient;
}());
exports.ProperTimeClient = ProperTimeClient;

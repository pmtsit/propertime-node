'use strict';

var ProperTimeClient = require('../client');
var utils = require('../utils');


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#create-a-client
 * @public
 * @param {Object} data New client data
 * @param {Function} callback <code>(err, clientData)</code>
 */
ProperTimeClient.prototype.createClient = function createClient(data, callback) {
    if (!this.validateOptions('client-create', data, callback)) {
        return;
    }

    var req = {
        method: 'POST',
        body: {
            client: data
        }
    };

    this.apiRequest('/clients', req, utils.wrapDataCallback(callback));
};


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#delete-a-client
 * @public
 * @param {Number|String} clientId Client ID
 * @param {Function} callback <code>(err)</code>
 */
ProperTimeClient.prototype.deleteClient = function deleteClient(clientId, callback) {
    var req = {
        method: 'DELETE'
    };

    this.apiRequest('/clients/' + clientId, req, callback);
};


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#get-client-details
 * @public
 * @param {Number|String} clientId Client ID
 * @param {Function} callback <code>(err, clientData)</code>
 */
ProperTimeClient.prototype.getClientData = function getClientData(clientId,
                                                             callback) {
    this.apiRequest('/clients/' + clientId, {},
        utils.wrapDataCallback(callback));
};


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#get-client-projects
 * @public
 * @param {Number|String} clientId Client ID
 * @param {String|Boolean} active Filter projects: active (true), archived (false), both
 * @param {Function} callback <code>(err, projects)</code>
 */
ProperTimeClient.prototype.getClientProjects = function getClientProjects(clientId,
                                                                     active, callback) {
    var qs = {
        active: active
    };

    if (!this.validateOptions('client-get-projects', qs, callback)) {
        return;
    }

    this.apiRequest('/clients/' + clientId + '/projects', { qs: qs },
        callback);
};


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#get-clients-visible-to-user
 * @public
 * @param {Function} callback <code>(err, clients)</code>
 */
ProperTimeClient.prototype.getClients = function getClients(callback) {
    this.apiRequest('/clients', {}, callback);
};


/**
 * @see https://github.com/properTime/properTime_api_docs/blob/master/chapters/clients.md#update-a-client
 * @public
 * @param {Number|String} clientId Client ID
 * @param {Object} data Client data
 * @param {Function} callback <code>(err, clientData)</code>
 */
ProperTimeClient.prototype.updateClient = function updateClient(clientId, data,
                                                           callback) {
    var req = {
        method: 'PUT',
        body: {
            client: data
        }
    };

    this.apiRequest('/clients/' + clientId, req,
        utils.wrapDataCallback(callback));
};

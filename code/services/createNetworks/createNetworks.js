/**
 * @typedef {object} Networks
 * @property {string} name
 * @property {string} nodes
*/

/**
 * @typedef {object} createNetworksParams
 * @property {Networks} item
 * @property {Networks[]} items
*/

/**
 * Creates items in the "Networks" collection
 * @param {{ params: createNetworksParams }} req
 * @param {createNetworksParams} req.params
 * @param {CbServer.Resp} resp
*/
function createNetworks(req, resp) {
  log(req) 
  if (!req.params.item && !req.params.items) {
    resp.error('invalid request, expected structure `{ item: { myProp: "", myProp2: "" } }`}')  
  }
  ClearBlade.init({ request: req }); 

  if (req.params.item) {
    req.params.items = [req.params.item];
  }
  var col = ClearBlade.Collection({ collectionName: 'Networks' });
  col.create(req.params.items, function(err, data) {
    log(data) 
    if (err) {
      resp.error(data);
    } else {
      resp.success(data);
    }
  });
}

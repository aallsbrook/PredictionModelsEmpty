/**
 * @typedef {object} Features
 * @property {string} name
 * @property {string} states
*/

/**
 * @typedef {object} createFeaturesParams
 * @property {Features} item
 * @property {Features[]} items
*/

/**
 * Creates items in the "Features" collection
 * @param {{ params: createFeaturesParams }} req
 * @param {createFeaturesParams} req.params
 * @param {CbServer.Resp} resp
*/
function createFeatures(req, resp) {
  log(req) 
  if (!req.params.item && !req.params.items) {
    resp.error('invalid request, expected structure `{ item: { myProp: "", myProp2: "" } }`}')  
  }
  ClearBlade.init({ request: req }); 

  if (req.params.item) {
    req.params.items = [req.params.item];
  }
  var col = ClearBlade.Collection({ collectionName: 'Features' });
  col.create(req.params.items, function(err, data) {
    log(data) 
    if (err) {
      resp.error(data);
    } else {
      resp.success(data);
    }
  });
}

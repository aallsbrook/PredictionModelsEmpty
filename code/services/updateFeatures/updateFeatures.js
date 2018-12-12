/**
 * @typedef {object} Features
 * @property {string} item_id
 * @property {string} name
 * @property {string} states
*/

/**
 * @typedef {object} updateFeaturesParams
 * @property {Features} item
 */

/**
 * Updates an item from the "Features" collection
 * @param {{ params: updateFeaturesParams }} req
 * @param {updateFeaturesParams} req.params
 * @param {CbServer.Resp} resp
 */
function updateFeatures(req, resp) {
  log(req)    
  if (!req.params.item || !req.params.item.item_id) {
    resp.error('invalid request, expected structure `{ item: { myPropToUpdate: "", item_id: "00000000-0000-0000-0000-000000000000" } } `')
  }
  ClearBlade.init({ request: req });

  var query = ClearBlade.Query();  
  query.equalTo('item_id', req.params.item.item_id);

  var col = ClearBlade.Collection({ collectionName: "Features" });
  col.update(query, req.params.item, function (err, data) {
    log(data)
    if (err) {
        resp.error(data)
    } else {
        resp.success(data);
    }
  });
}

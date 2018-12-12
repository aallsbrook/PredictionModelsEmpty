/**
 * @typedef {object} FeatureGroups
 * @property {string} item_id
 
*/

/**
 * @typedef {object} updateFeatureGroupsParams
 * @property {FeatureGroups} item
 */

/**
 * Updates an item from the "FeatureGroups" collection
 * @param {{ params: updateFeatureGroupsParams }} req
 * @param {updateFeatureGroupsParams} req.params
 * @param {CbServer.Resp} resp
 */
function updateFeatureGroups(req, resp) {
  log(req)    
  if (!req.params.item || !req.params.item.item_id) {
    resp.error('invalid request, expected structure `{ item: { myPropToUpdate: "", item_id: "00000000-0000-0000-0000-000000000000" } } `')
  }
  ClearBlade.init({ request: req });

  var query = ClearBlade.Query();  
  query.equalTo('item_id', req.params.item.item_id);

  var col = ClearBlade.Collection({ collectionName: "FeatureGroups" });
  col.update(query, req.params.item, function (err, data) {
    log(data)
    if (err) {
        resp.error(data)
    } else {
        resp.success(data);
    }
  });
}

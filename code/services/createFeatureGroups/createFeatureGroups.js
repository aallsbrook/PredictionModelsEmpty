/**
 * @typedef {object} FeatureGroups
 
*/

/**
 * @typedef {object} createFeatureGroupsParams
 * @property {FeatureGroups} item
 * @property {FeatureGroups[]} items
*/

/**
 * Creates items in the "FeatureGroups" collection
 * @param {{ params: createFeatureGroupsParams }} req
 * @param {createFeatureGroupsParams} req.params
 * @param {CbServer.Resp} resp
*/
function createFeatureGroups(req, resp) {
  log(req) 
  if (!req.params.item && !req.params.items) {
    resp.error('invalid request, expected structure `{ item: { myProp: "", myProp2: "" } }`}')  
  }
  ClearBlade.init({ request: req }); 

  if (req.params.item) {
    req.params.items = [req.params.item];
  }
  var col = ClearBlade.Collection({ collectionName: 'FeatureGroups' });
  col.create(req.params.items, function(err, data) {
    log(data) 
    if (err) {
      resp.error(data);
    } else {
      resp.success(data);
    }
  });
}

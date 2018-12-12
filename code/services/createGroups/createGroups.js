/**
 * @typedef {object} Groups
 * @property {string} name
 * @property {string} networks
*/

/**
 * @typedef {object} createGroupsParams
 * @property {Groups} item
 * @property {Groups[]} items
*/

/**
 * Creates items in the "Groups" collection
 * @param {{ params: createGroupsParams }} req
 * @param {createGroupsParams} req.params
 * @param {CbServer.Resp} resp
*/
function createGroups(req, resp) {
  log(req) 
  if (!req.params.item && !req.params.items) {
    resp.error('invalid request, expected structure `{ item: { myProp: "", myProp2: "" } }`}')  
  }
  ClearBlade.init({ request: req }); 

  if (req.params.item) {
    req.params.items = [req.params.item];
  }
  var col = ClearBlade.Collection({ collectionName: 'Groups' });
  col.create(req.params.items, function(err, data) {
    log(data) 
    if (err) {
      resp.error(data);
    } else {
      resp.success(data);
    }
  });
}

function runNetwork(req, resp) {
  log(req)
  time_start = performance.now();
  ClearBlade.init({request:req});

  var nodes={};
  var initial_prob = 0;
  var res = 0;
  var ret={}
  var getNetworkByName = function() {
    var callback = function (err, data) {
        if (err) {
        	resp.error("fetch error : " + JSON.stringify(data));
        } else {
          networks = data.DATA;
          log("Networks for Group")
          log(networks)
          
        }
    };

   	var col = ClearBlade.Collection({collectionName:"Networks"});
   	var query = ClearBlade.Query();
   	//query.equalTo("name", req.params.network);
     if(req.params.group==""){
       var payload = "No group id provided";
       resp.success(payload)
     }
    query.equalTo("groupid", req.params.group);
    col.fetch(query, callback);

  }

  
  var executeBayes = function(network) {
    initial_prob = parseFloat(network.present_prob);
    nodes = JSON.parse(network.nodes);
                
    // zero index our inputs
    var input_array = []

    for (x in req.params.inputs){
      input_array.push(parseInt(req.params.inputs[x])-1)
    }
    log("Input Array")
    log(input_array);
    
    var list_top = []
    var list_base = []

    for (y in nodes){
      if (input_array[y]!=-1){
        list_top.push(parseFloat(nodes[y].probabilities_present[input_array[y]]))
        list_base.push(parseFloat(nodes[y].probabilities_absent[input_array[y]]))
      }
      
    }
    log("Present Probabilities");
    log(list_top);
    log("Absent Probabilities")
    log(list_base)

    function rest_probability(a){
      return (1 - a)
    }

    function bayes_formula(pr_abs,pr1,pr2) {
        numerator = pr_abs * pr1
        denominator = numerator + rest_probability(pr_abs) * pr2
        result = numerator/denominator
        return result
    }
    
    for (var k = 0; k < list_top.length; k++){
        res = bayes_formula(initial_prob,list_top[k],list_base[k])
        initial_prob = res
    }
    return res;
  }

  getNetworkByName(); 
  for (var i=0; i<networks.length; i++){

    probability = executeBayes(networks[i]);
    ret[networks[i].name]=probability;
  }
  
  time_end=performance.now();
  time_used = time_end - time_start;
  log("Execution Time: " + time_used+" millisecs")
  //var network = req.params.network;
  var executionResp ={};
  executionResp.probabilities = ret
  executionResp.executionTime = time_used;
  //ret[network]=res
  resp.success(executionResp)
  


}

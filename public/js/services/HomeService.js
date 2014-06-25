//Helper service used to support the drag and drop feature
app.service('HomeService', function($http, statusOrder, $timeout, $document){

  console.log(statusOrder);

  //callback function that will be executed when a successful drop happens
  this.dropHandler = function(data){
    //data is an array of 3 objects
    that = this;
    var callback = function(data){
      console.log('Executed Call Back: ', data);
      $http.post('/user/update', data);
      console.log('history stack: ', that.history);
      that.history.shift()
      console.log('history stack: ', that.history);
    }
    this.history.push({timeout:$timeout(function () { callback(data); }, 10000), data: data});
  };

  //property that will be used to store a reference to the object being dragged
  //this reference will be used when a successful drop occurs to append the object to the new status bin
  this.element = null;

  //event history
  this.history = [];

  //creating a variable to reference this
  var that = this;

  this.undoLast = function(){

    if (!that.history.length){
      return;
    }
    //pull out the last change from the history stack
    var last = that.history.pop();

    //cancel the http post request
    $timeout.cancel(last.timeout);

    //get the original ids from the data field
    var originalId = last.data.origin.id;
    var companyId = last.data.company.id;

    //find the original node
    var originalNodeList = $document[0].querySelectorAll('[statusId="'+originalId+'"]');
    var originalNode;
    for (var i = 0; i< originalNodeList.length; i++){
      if (originalNodeList[i].getAttribute('elementType')==='statusbox'){
        originalNode = originalNodeList[i];
      }
    }

    //get the company name
    var companyNode = $document[0].querySelectorAll('[companyId="'+companyId+'"]')[0];
    companyNode.setAttribute('statusId', originalNode.getAttribute('statusId'));
    companyNode.setAttribute('statusName', originalNode.getAttribute('statusName'));
    companyNode.setAttribute('statusOrder', originalNode.getAttribute('statusOrder'));

    originalNode.querySelector('#companyContainer').appendChild(companyNode);
  }
});

//Service used to check if drop is valid or not. If changes are needed, only this service and app.value need to be changed
app.factory('checkValidDrop', function(statusOrder){

  var check = function (source, target){

    //check to see if source is unknown
    //an unknown status bin means the bin is a non-standard bin defined in app.value
    //therefore any more outside of the unknown bin is legal
    if (source === 'unknown'){
      return true;

    //if the target status bin is to a non-standard bin, the move is illegal
    } else if (target === 'unknown') {
      return false;

    //Check to see if the target is the Graveyard or if the target has a higher statusOrder
    //If so, legal
    } else if (target*1 === statusOrder['Graveyard'] || source*1 < target*1){
      return true;

    //All other cases are illegal (source > target)
    } else {
      return false;
    }
  };

  return check;
});

//Value used for defining the status Order of each status.
app.value('statusOrder', {
  'Graveyard': 1,
  'Leads': 2,
  'Applied': 3,
  'Screen Conversation Scheduled': 4,
  'Post Screen Conversation': 5,
  'Pre-Onsite Tech Screen (phone/take home) Scheduled': 6,
  'Post Tech Screen (Phone/take home)': 7,
  'On-Site Scheduled': 8,
  'Post On-Site': 9,
  'Offers': 10}
);
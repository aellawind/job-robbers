//Helper service used to support the drag and drop feature
app.service('dragHelper', function($http, statusOrder){

  console.log(statusOrder);
  //callback function that will be executed when a successful drop happens
  this.dropHandler = function(data){
    //dataArray is an array of 3 objects:
    return $http.post('/user/update', data);
  };

  //property that will be used to store a reference to the object being dragged
  //this reference will be used when a successful drop occurs to append the object to the new status bin
  this.element = null;
});

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
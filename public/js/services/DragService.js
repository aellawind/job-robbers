//Helper service used to support the drag and drop feature
app.service('dragHelper', function($http){

  //callback function that will be executed when a successful drop happens
  this.dropHandler = function(data){
    //dataArray is an array of 3 objects:
    return $http.post('/user/update', data)
  };

  //property that will be used to store a reference to the object being dragged
  //this reference will be used when a successful drop occurs to append the object to the new status bin
  this.element = null;
});
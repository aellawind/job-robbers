app.controller('DragController', function ($scope, setupDragListeners, dragData, $timeout) {

  //load the scope with dummy data
  $scope.data = dragData;

  //need to wait 1 tick so the ng-repeat directives can run
  $timeout(setupDragListeners);

})

.factory('setupDragListeners',function(){

  //variable to be used to reference the object being dragged
  var elem;

  //Function to setup the drag and drop listeners on each company element
  //TODO: Refactor into a directive
  var initialize = function(){

    //Get a list of company nodes (company nodes are draggable)
    var nodes = document.getElementsByClassName('dr-company');

    //Get a list of the status bins (where the company nodes will be dropped in)
    var statuses = document.getElementsByClassName('dr-status-box');

    //What the status bin should do when a company node drags into the bin
    var dragenterHandler = function(e){
      console.log('Enter: ',this);
    };

    //What the status bin should do while the company node is hovering over the bin
    var dragoverHandler = function(e){
      if (e.preventDefault) {
        //Necessary to allow the company node to drop.
        e.preventDefault();
      }

      //Specify what type of drags are allowed. Must match the drop handler
      e.dataTransfer.dropEffect = 'move';
      return false;
    };

    //What the status bin should do when the company node drags out of the bin
    var dragleaveHandler = function(e){
      console.log('leave: ',this);
    };

    //What should the company node do when the company node starts dragging
    var dragstartHandler = function(e){
      elem = this;
      console.log('start: ',elem);
    };


    //What the status bin should do when the company node is dropped into the bin
    var dragdropHandler = function(e){
      console.log('e',e);
      console.log('dropped: ',this);

      if (e.stopPropagation) {
        // stops the browser from redirecting.
        e.stopPropagation();
      }
      //Specify what type of drags are allowed. Must match the drop handler
      e.dataTransfer.dropEffect = 'move';

      this.appendChild(elem);
      return false;
    };

    //What should the company node do when the company node stops dragging
    var dragendHandler = function(e){
      console.log('end: ',this);
    };

    //Go through all of the company nodes and add listeners
    for (var i = 0; i<nodes.length; i++){
      var node = nodes[i];
      node.addEventListener('dragstart', dragstartHandler);
      node.addEventListener('dragend', dragendHandler);
    }

    //Go through all of the status bins and add listeners
    for (var y = 0; y<statuses.length; y++){
      var status = statuses[y];
      status.addEventListener('dragover', dragoverHandler);
      status.addEventListener('dragenter', dragenterHandler);
      status.addEventListener('dragleave', dragleaveHandler);
      status.addEventListener('drop', dragdropHandler);
    }
  };

  //return the function;
  return initialize;
})

//Function to generate a random number of companies for each status bin
.factory('dragData', function(){
  var status = ['Offers', 'Post On-Site','Post-Phone Screen', 'Phone Screen Scheduled', 'Applied', 'Leads', 'Graveyard'];

  var sample = [];
  var counter = 0;

  for (var i = 0; i<status.length; i++){
    var group = [];
    var random = Math.floor(Math.random()*5)+1;
    for (var y=0; y<random; y++){
      counter++;
      group.push({companyName: 'company'+ counter});
    }
    var statusName = status[i];
    sample.push({statusName: statusName, companies: group});
  }
  return sample;
})




app.controller('DragController', function ($scope, dragData) {

  $scope.data = dragData;

});

//Function to generate a random number of companies for each status bin
app.factory('dragData', function(){
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
});

app.directive('statusBuckets', function(dragData, $window){
  return {
    replace: true,
    restrict: 'AE',
    scope: {},
    templateUrl: '../../views/statusBuckets.html',
    link: function(scope, element, attr){
      //dummy data
      scope.statuses=dragData;
      var results = [];
      for (var i = 0; i<dragData.length; i++){
        for (var j = 0; j<dragData[i].companies.length; j++){
          results.push(dragData[i].companies[j]);
        }
      }
      scope.companies=results;
      //
      $window.elem;
    }
  }
});

app.directive('boxListeners', function(dragData){
  return {
    replace: false,
    restrict: 'AE',
    scope: {},
    link: function(scope, element, attr){
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

      var el = element[0];
      el.addEventListener('dragover', dragoverHandler);
      el.addEventListener('dragenter', dragenterHandler);
      el.addEventListener('dragleave', dragleaveHandler);
      el.addEventListener('drop', dragdropHandler);

    }
  };
});

app.directive('draggableItem', function(dragData){
  return {
    replace: true,
    restrict: 'AE',
    scope: {},
    link: function(scope, element, attr){

      //What should the company node do when the company node starts dragging
      var dragstartHandler = function(e){
        elem = this;
        console.log('start: ',elem);
      };

      //What should the company node do when the company node stops dragging
      var dragendHandler = function(e){
        console.log('end: ',this);
      };

      var el = element[0];
      el.draggable = true;

      el.addEventListener('dragstart', dragstartHandler);
      el.addEventListener('dragend', dragendHandler);
    }
  };
});


var asanaMain  = {
  'APIUrl'      : 'https://app.asana.com/api/1.0',
  'workspaceId' : '1213745087037'
};

module.exports = {

  projects            : function () {
    return asanaMain.APIUrl + '/workspaces/' + asanaMain.workspaceId + '/projects'
  },

  user                : function (projectId) {
    return asanaMain.APIUrl + '/projects/' + projectId + '/tasks?opt_mobile=true';
  },

  addTask             : function (companyId) {
    return asanaMain.APIUrl + '/tasks/' + companyId + '/addProject';
  },

  fetchOrAddComments  : function (companyId) {
    return asanaMain.APIUrl + '/tasks/' + companyId + '/stories';
  },

  completeTask       : function (taskId) {
    return asanaMain.APIUrl + '/tasks/' + taskId
  }

};
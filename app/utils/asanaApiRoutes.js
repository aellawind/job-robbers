module.exports = {

  'APIUrl'            : 'https://app.asana.com/api/1.0',

  'workspaceId'       : '1213745087037',

  'projects'          : this.APIUrl + '/workspaces/' + this.workspaceId + '/projects',

  user                : function (projectId) {
    return this.APIUrl + '/projects/' + projectId + '/tasks?opt_mobile=true';
  },

  addTask             : function (companyId) {
    return this.APIUrl + '/tasks/' + companyId + '/addProject';
  },

  fetchOrAddComments  : function (companyId) {
    return this.APIUrl + '/tasks/' + companyId + '/stories';
  },

  completeTasks       : function (taskId) {
    return this.APIUrl + '/tasks/' + taskId
  }

}
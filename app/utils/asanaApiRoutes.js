var asanaMain  = {
  'APIUrl'      : 'https://app.asana.com/api/1.0',
  'workspaceId' : 1213745087037
};

module.exports = {

  followers           : 
  [ { id: 6384579925796, name: 'Ruan Pethiyagoda' },
    { id: 12218806480331, name: 'Mike Adams' } ],

  projects            : function () {
    return asanaMain.APIUrl + '/workspaces/' + asanaMain.workspaceId + '/projects'
  },

  user                : function (projectId) {
    return asanaMain.APIUrl + '/projects/' + projectId + '/tasks?opt_mobile=true';
  },

  me                  : function () {
    return asanaMain.APIUrl + '/users/me?opt_mobile=true';
  },

  addCompany          : function () {
    return asanaMain.APIUrl + '/workspaces/' + asanaMain.workspaceId + '/tasks';
  },

  addTask             : function (companyId) {
    return asanaMain.APIUrl + '/tasks/' + companyId + '/addProject';
  },

  fetchOrAddComments  : function (companyId) {
    return asanaMain.APIUrl + '/tasks/' + companyId + '/stories';
  },

  completeTask        : function (taskId) {
    return asanaMain.APIUrl + '/tasks/' + taskId
  },

  workspaceId         : asanaMain.workspaceId
  // hiringTeam          : 

};
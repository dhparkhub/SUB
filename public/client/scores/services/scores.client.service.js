
angular.module('scores').factory('Scores', ['$resource', ($resource) => {
  return $resource('api/scores/:scoreId', { scoreId: '@_id' }, { update: { method: 'PUT' } })
}])

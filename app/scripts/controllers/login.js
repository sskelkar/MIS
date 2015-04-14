'use strict';

/**
 * @ngdoc function
 * @name myMisAppApp.controller:EmployeectrlCtrl
 * @description
 * # EmployeectrlCtrl
 * Controller of the myMisAppApp
 */
angular.module('myMisAppApp')
  .controller('LoginCtrl', function ($scope, EmployeeDumpService, LoginService) {

		EmployeeDumpService.getEmployeeData().success(function(data) {
			$scope.employees = data;
		});

		$scope.showLoginWindow = true;
		$scope.invalidLogin = false;

		$scope.login = function() {
			LoginService.setCurrEmployee(null);
			angular.forEach($scope.employees, function(employee) {
				if(employee.username === $scope.username && employee.password === $scope.password)
				{
					LoginService.broadcast(employee);
					$scope.showLoginWindow = false;
					$scope.invalidLogin = false;
				}
			});

			if(LoginService.getCurrEmployee() === null)
			{
				$scope.invalidLogin = true;
			}
			$scope.username = $scope.password = null;
		};

		$scope.logout = function() {
			LoginService.broadcast(null);
			$scope.showLoginWindow = true;
		};
  });

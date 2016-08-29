var gui = require('nw.gui');
// Get the current window
var win = gui.Window.get();
// App Control
var app = angular.module("app", []);

//Main
//Create the main controller with the following services: scope, interval and timeout
app.controller('mainCtrl', ['$scope', '$interval', '$timeout', 
function($scope, $interval, $timeout) {
	
	//On open, move the window to the bottom right corner of the screen
	var counter = 0,
		settingsOpen = false,
		messageArray = [
			"Time for a walk, buddy",
			"You look thirsty! Take a water break", 
			"Dance break!",
			"Let's take a stroll around the corner",
			"SQUIRREL!",
			"You know what time it is... Hammertime!"
		];

	//Open Dev Tools
	$scope.openDevTools = function($event) {
	    if (win.isDevToolsOpen()) {
	      win.closeDevTools();
	      this.innerText = "Open Developer Tools";
	    } else {
	      win.showDevTools();
	      this.innerText = "Close Developer Tools";
	    }
	}
	
	//Minimize the window
	$scope.minimizeIt = function($event) {
		win.minimize();
		$event.preventDefault();
	}
	
	//Close the window
	$scope.closeIt = function($event) {
		win.close();
		$event.preventDefault();
	}
	
	//Create functionality to open the settings
	$scope.toggleSettings = function($event) {
		$scope.settingsOpen = !$scope.settingsOpen;
	}
	
	//Settings
	$scope.settings = {
		"interval" : 5 //Minutes
	}
	//Calculate break intervals and convert to milliseconds
	$scope.breakInterval = (($scope.settings.interval)*1000);

	$scope.updateSettings = function(settings) {
		$scope.breakInterval = (($scope.settings.interval)*1000);
		console.log('settings.interval ' + $scope.settings.interval);
		console.log('breakInterval ' + $scope.breakInterval);

		//Run the clock on open
		$scope.hammerTime($scope.breakInterval);
		$scope.toggleSettings();
	}

	//Get the curret date and time, and move the clock along using $interval service with a promise
	$scope.hammerTime = function(intervals) {
		$scope.showMessage = false;
		$scope.currentTime = new Date(); //Create a new date object
		$scope.nextBreak = new Date($scope.currentTime.getTime() + 1*60*(intervals)); //Calculate time to next break
		$scope.message = messageArray[counter];
		console.log(counter);
		
		$interval(function() { //Interval service with promise
			$scope.currentTime = Date.now();
			
			//When current time equals or is past next beak time
			if ($scope.currentTime >= $scope.nextBreak.getTime()) {
				$scope.showMessage = true;
			}
		}, 1000); //interval to update the clock in milliseconds
		
		if (counter < messageArray.length-1) {
			counter++;
		} else {
			counter = 0;
		}
	};
	
	//Run the clock on open
	$scope.hammerTime($scope.breakInterval);
	
}]);
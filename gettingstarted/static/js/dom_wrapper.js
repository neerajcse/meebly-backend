// //dom_wrapper.js

// // Model object for the page.
// function PageModel(children) {

// 	// List of children should be stored in the model
// 	// for pesistence.
// 	this._children = children;


// 	// Events that modify this model.
// 	this.childAdded = new Event(this);
// 	this.childRemoved = new Event(this);
// }

// PageModel.prototype = {
// 	getChildren : function() {
// 		//Return a clone so that no one can modify the 
// 		//real variable.
// 		return [].concat(this._children);
// 	},

// 	addChild: function(child) {
// 		this._children.push(child);

// 		// Send the notifications to controller/view
// 		this.childAdded.notify({element: child});
// 	},

// 	removeChildAtPosition: function(position) {
// 		var child;

// 		child = this._children[position];
// 		this._children.splice(position, 1);
// 		this.childRemoved.notify({element: child});
// 	},

// };

// function Event(observant) {
// 	this._observant = observant;
// 	this._observers = [];
// }

// Event.prototype = {
// 	attach: function(observer) {
// 		this._observers.push(observer);
// 		console.log("Adding observer to " + this._observant);
// 	},

// 	notify: function(args) {
// 		// Works for ECMA5 compliant browsers only.
// 		// But can be added to the array prototype for backwards compatibility.
// 		/**this._observant.forEach(function(callee) {
// 			callee(this._observant, args);
// 		});**/

		
//         for (index = 0; index < this._observers.length; index += 1) {
//             this._observers[index](this._observant, args);
//         }
// 	}
// };


// // View object for the page.
// function PageView(model, element) {
// 	this._model = model;
// 	this._element = element;

// 	this.childrenModified = new Event(this);
// 	this.addButtonClicked = new Event(this);
// 	this.removeButtonClicked = new Event(this);

// 	// To change the ownership of the method
// 	var _this = this;


// 	// Registering itself as observer
// 	this._model.childAdded.attach(function() {
// 		_this.redrawChildren();
// 	});

// 	this._model.childRemoved.attach(function() {
// 		_this.redrawChildren();
// 	});


// 	// DOM events
// 	this._element.addButton.addEventListener('click',
// 		function() {
// 			_this.addButtonClicked.notify();
// 		}
// 	);
	
// 	this._element.removeButton.addEventListener('click', 
// 		function() { 
// 			_this.removeButtonClicked.notify();
// 		}
// 	);


// }

// PageView.prototype = {
// 	show: function() {
// 		this.redrawChildren();
// 	},

// 	redrawChildren: function() {
// 		var domElement, children, child;

// 		domElement = this._element.domElement;
// 		domElement.innerHTML = '';

// 		children = this._model.getChildren();
// 		for (child in children) {
// 			domElement.innerHTML += '<li>' +  children[child] + '</li>';
// 		}
// 	}
// }


// /**
// Controller for the page object.
// **/

// function PageController(model, view) {
// 	this._model = model;
// 	this._view = view;

// 	var _this = this;

// 	// Observe the view
// 	this._view.childrenModified.attach(function(sender, args) {

// 	});

// 	this._view.addButtonClicked.attach(function(){
// 		_this.addChild();
// 	});

// 	this._view.removeButtonClicked.attach(function(){
// 		_this.removeChild();
// 	});

// }


// PageController.prototype = {
// 	addChild: function() {
// 		console.log("add");
// 		var item = Math.random() * 10;
// 		console.log(item);

// 		if (item) {
// 			this._model.addChild(item);
// 		}
// 	},

// 	removeChild: function() {
// 		if(this._model.getChildren().length > 0) {
// 			console.log("attempting to remove");
// 			this._model.removeChildAtPosition(0);
// 		}
// 	},

// };


// window.onload = function() {
// 	console.log('ping');
// 	var model = new PageModel(['test']);
// 	var element = {
// 		'domElement' : document.getElementById("myUl"),
// 		'addButton' : document.getElementById("myPlusButton"),
// 		'removeButton': document.getElementById("myMinusButton"),
// 	};
// 	var view = new PageView(model, element);
// 	var controller = new PageController(model, view);

// 	view.show();
// };
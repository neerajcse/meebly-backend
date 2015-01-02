define(["../observer/event"], function(Event){
	
	// View object for the page.
	function PageView(model, element) {
		this._model = model;
		this._element = element;

		console.log('requirejs view')

		this.childrenModified = new Event(this);
		this.addButtonClicked = new Event(this);
		this.removeButtonClicked = new Event(this);
		this.dropReceived = new Event(this);

		// To change the ownership of the method
		var _this = this;


		// Registering itself as observer
		this._model.childAdded.attach(function() {
			_this.redrawChildren();
		});

		this._model.childRemoved.attach(function() {
			_this.redrawChildren();
		});


		// DOM events
		this._element.addButton.addEventListener('click',
			function() {
				_this.addButtonClicked.notify();
			}
		);
		
		this._element.removeButton.addEventListener('click', 
			function() { 
				_this.removeButtonClicked.notify();
			}
		);

		this._element.domElement.addEventListener("dragover", function(event) {
   		 event.preventDefault();
		});

		this._element.domElement.addEventListener('drop', function(event) {
			event.preventDefault();
			console.log("drop intercepted")
			console.log(event.target.tagName);
		});
		/**this._element.domElement.addEventListener('drop', 
			function(event) {
				event.preventDefault();
				console.log("droppped view")
				_this.dropReceived.notify();
			}
		);*/


	}

	PageView.prototype = {
		show: function() {
			this.redrawChildren();
		},

		redrawChildren: function() {
			var domElement, children, child;

			domElement = this._element.domElement;
			domElement.innerHTML = '';

			children = this._model.getChildren();
			for (child in children) {
				domElement.innerHTML += '<li>' +  children[child] + '</li>';
			}
		}
	};

	return PageView;
});
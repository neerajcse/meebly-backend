define(["../observer/event"], function(Event) {
	function PageController(model, view) {
		this._model = model;
		this._view = view;

		var _this = this;

		// Observe the view
		this._view.childrenModified.attach(function(sender, args) {

		});

		this._view.addButtonClicked.attach(function(){
			_this.addChild();
		});

		this._view.removeButtonClicked.attach(function(){
			_this.removeChild();
		});

	}


	PageController.prototype = {
		addChild: function() {
			console.log("add");
			var item = Math.random() * 10;
			console.log(item);

			if (item) {
				this._model.addChild(item);
			}
		},

		removeChild: function() {
			if(this._model.getChildren().length > 0) {
				console.log("attempting to remove");
				this._model.removeChildAtPosition(0);
			}
		},

	};

	return PageController;
	
});
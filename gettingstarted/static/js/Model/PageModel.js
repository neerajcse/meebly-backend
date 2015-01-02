define(["../observer/event"], function(Event){
	function PageModel(children) {

		// List of children should be stored in the model
		// for pesistence.
		this._children = children;


		// Events that modify this model.
		this.childAdded = new Event(this);
		this.childRemoved = new Event(this);
	}


	PageModel.prototype = {
		getChildren : function() {
			//Return a clone so that no one can modify the 
			//real variable.
			return [].concat(this._children);
		},

		addChild: function(child) {
			this._children.push(child);

			// Send the notifications to controller/view
			this.childAdded.notify({element: child});
		},

		removeChildAtPosition: function(position) {
			var child;

			child = this._children[position];
			this._children.splice(position, 1);
			this.childRemoved.notify({element: child});
		},

	};

	return PageModel;
});
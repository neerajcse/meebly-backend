define(["../observer/event"], function(Event){
	function EditButtonView(element) {
		this._element = element;
		this._pageId = element.pageID;
		this._nameField = document.getElementById('title-' + this._pageId);
		this._deleteButton = document.getElementById('delete-' + this._pageId);
		this._editButton = document.getElementById('edit-' + this._pageId);
		

		this.pageRemoved = new Event(this);
		this.pageTitleEdited = new Event(this);

		var _this = this;

		console.log("Initializing add button" + this._pageId + "on " + this);
		
		this._deleteButton.addEventListener('click', function() {
			_this.deleteHandler();
		});

		this._editButton.addEventListener('click', function() {
			_this.notifyIfNotEmpty();
		});

	}

	EditButtonView.prototype = {
		notifyIfNotEmpty: function() {
			if (this._nameField.value == "") return;
			val = this._nameField.value;
			this.pageTitleEdited.notify({title:val, id: this._pageId});
			console.log("Triggering edit event with " + val);
		},
		deleteHandler: function() {
			console.log("Handling delete");
			console.log("Remove event for " + this._pageId);
			this.pageRemoved.notify(this._pageId);
		}
	};

	return EditButtonView;
});
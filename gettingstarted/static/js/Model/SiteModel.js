define(["../observer/event"], function(Event){
	
	function SiteModel(pages) {

		this.modelType = "site";

		// List of children should be stored in the model
		// for pesistence.
		this._pages = pages;


		// Events that this model supports.
		this.pageAdded = new Event(this);
		this.pageRemoved = new Event(this);
		this.pageEdited = new Event(this);

		// Events specifically for DAO
		this.modelUpdated = new Event(this);
	}


	SiteModel.prototype = {
		getPages : function() {
			// Return a clone so that no one can modify the 
			// model directly.
			return [].concat(this._pages);
		},

		addPage: function(page) {
			// Get the ID of the latest page according 
			// to the last page id existingin the database.
			page_id = this._dao.getNewPageId();
			page.id = page_id;

			this._pages[page.id] = page;
			console.log("Updated model:");

			for(var key in this._pages) {
				console.log("Key:" + key + "value:" + this._pages[key]);
			}

			// Send the notifications to controller/view/DAO
			this.pageAdded.notify(page);

			// Will be used when multiple people are trying 
			// to edit the pages of a single account at the
			// same time. Like a push notification.
			this.modelUpdated.notify({type:this.modelType,
			 pages: this.getPages()});
		},

		removePageWithID: function(pageId) {
			delete this._pages[pageId];
			this.pageRemoved.notify(pageId);
			this.modelUpdated.notify({type:"site", 
				pages: this.getPages()});
		},

		editPage: function(args) {
			this._pages[args.id] = args.title;
			this.pageEdited.notify(args);
			for(var key in this._pages) {
				console.log("Key:" + key + "value:" + this._pages[key]);
			}

			this.modelUpdated.notify({type:"site", 
				pages: this.getPages()});
		},

		registerDAO: function(dao_object) {
			this._dao = dao_object;
			json_pages = JSON.parse(this._dao.getPages()).pages;
			for(var page in json_pages) {
				console.log(json_pages[page].title + "::" + json_pages[page].id);
				this._pages[json_pages[page].id] = json_pages[page];
			}
		},

	};

	return SiteModel;
});
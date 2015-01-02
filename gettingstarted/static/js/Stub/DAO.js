define(['../Model/SiteModel'], function(SiteModel){
	
	function DAO(REST_URL, model) {
		console.log("******");
		this._model = model;
		this._model.registerDAO(this);
		this._url = REST_URL + "/rest/meebly/" + this._modelType;

		_this = this;

		model.pageAdded.attach(function(target, page) {
			_this.post(page);
		});

		model.pageRemoved.attach(function(target, id) {
			_this.del(id);
		});

		model.pageEdited.attach(function(target, page){
			_this.put(page);
		});

	}

	DAO.prototype = {
		put : function(page) {
			console.log("PUT");
			return this.makeAjaxRequestAndGetResponse("PUT", "/meebly/rest", JSON.stringify(page));
		},
		getPages: function() {
			console.log("GET");
			console.log("getting data from web");
			return this.makeAjaxRequestAndGetResponse("GET", "/meebly/rest");
		},
		post: function(page) {
			id = page.id;
			new_title = page.title;
			console.log("post");
			console.log(id + "" + new_title);
			return this.makeAjaxRequestAndGetResponse("PUT", "/meebly/rest", JSON.stringify(page));
		},
		del: function(id) {
			console.log("DEL");
			console.log(id);
			return this.makeAjaxRequestAndGetResponse("DELETE", "/meebly/rest", id);
		},
		getNewPageId: function() {
			return this.makeAjaxRequestAndGetResponse("GET", "/meebly/new_page_id");
		},
		makeAjaxRequestAndGetResponse: function(type, url, request_content) {
			var http_request = new XMLHttpRequest();
			// making a synchronous request.
			// if time permits start using async to improve 
			// user experience.
			http_request.open(type, url, false);
			http_request.send(request_content || "");
			return http_request.responseText;
		}
	};

	return DAO;
});
define(["../observer/event", "../View/EditButtonView"], function(Event, EditButtonView){
	function SiteView(sitemodel, element, addButton) {
		this._model = sitemodel;
		this._element = element;
		this._addButton = addButton;
		console.log(this._element.pageTabs);
		//this._element.pageTabs.innerHTML += "Hello world";

		this.pageAdded = new Event(this);
		this.pageRemoved = new Event(this);
		this.pageEdited = new Event(this);

		this._buttonViews = [];

		var _this = this;

		_this._addButton.pageAdded.attach(function(source, e) {
			//_this.addPageInView(e);
			_this.pageAdded.notify(e);
		});

		_this._model.pageAdded.attach(function(source, e){
			_this.addPageInView(e);
		});

		_this._model.pageRemoved.attach(function(source, e){
			for (var i = _this._buttonViews.length - 1; i >= 0; i--) {
			    if (_this._buttonViews[i] === e) {
			        _this._buttonViews.splice(i, 1);
			        break;
			    }
			}
			console.log("removed from view.Rerendering " + _this._buttonViews);
			_this.removePagebyId(e);
		});

		_this._model.pageEdited.attach(function(source, e){
			console.log("Received event from model for edit page");
			_this.editPageWithId(e);
		});

	}

	SiteView.prototype = {
		show : function() {
			this.redrawSideBarAndPages();
		},

		redrawSideBarAndPages: function() {
			var domElement, sideBarWidget, pages, page;

			pages = this._model.getPages();
			for (page in pages) {
				this.addPageInView(pages[page]);
			}
		},

		generateHTMLForTab: function(page) {
			console.log("Generating html for tab " + page.id)
			return '<li id="page-tab-' + page.id + '">' + page.title + '</li>';
		},

		generateHTMLForPage: function(page) {
			return '<div id="page-' + page.id +
					'">New page with title' + page.title + '</div>'; 
		},

		generateButtonForSideWidget: function(page) {
			return '<div class="edit-page-group" id="rembutton-' + page.id + '">' +
						'<div class="holder">'+
							'<input class="title" id="title-' + page.id +'" value="' +  page.title + '"/>' +
						'</div>'+
						'<div class="edit-button" id="edit-' + page.id + '"></div>' +
						'<div class="delete-button" id="delete-' + page.id + '"></div>' + 
				   '</div>';
		},

		editPageWithId: function(args) {
			console.log("updating view : " + args.id);
			document.getElementById('page-tab-' + args.id).innerHTML = args.title;
		},

		removePagebyId: function(pageId) {
			document.getElementById('rembutton-' + pageId).remove();
			document.getElementById('page-' + pageId).remove();
			document.getElementById('page-tab-' + pageId).remove();
			sideBarWidget.style.height = sideBarWidget.offsetHeight - 30 + "px";
		},

		showTabWithId: function(pageId) {
			for(var id in this._buttonViews) {
				document.getElementById("page-" + this._buttonViews[id]).className = 
					document.getElementById("page-" + this._buttonViews[id]).className.replace(" selected", "").replace(" notselected", "");
				document.getElementById("page-tab-" + this._buttonViews[id]).className = 
					document.getElementById("page-tab-" + this._buttonViews[id]).className.replace(" selected", "").replace(" notselected", "");
					
				document.getElementById("page-" + this._buttonViews[id]).className+= " notselected";
				document.getElementById("page-tab-" + this._buttonViews[id]).className+= " notselected";				

			}
			document.getElementById("page-" + pageId).className = 
				document.getElementById("page-" + pageId).className.replace(" notselected", " selected");
			document.getElementById("page-tab-" + pageId).className = 
				document.getElementById("page-tab-" + pageId).className.replace(" notselected", " selected");
				
			
		},

		addPageInView: function(page) {
			domElement = this._element.domElement;
			sideBarWidget = this._element.sideBarWidget;
			pageTabs = this._element.pageTabs;

			domElement.innerHTML += 
				this.generateHTMLForPage(page);
			var newTab = this.generateHTMLForTab(page);
			console.log("HTML for new tab is " + newTab)
			this._element.pageTabs.innerHTML += newTab;
			id = page.id;
			
				
			sideBarWidget.innerHTML += 
				this.generateButtonForSideWidget(page);
			sideBarWidget.style.height = sideBarWidget.offsetHeight + 30 + "px";

			//These button will have remove/edit options. Listen for those events.
			var _this = this;
			
			this._buttonViews.push(page.id);
			
			
			for(var id in this._buttonViews) {
				var editButtonView = new EditButtonView({'pageID' : this._buttonViews[id]});
				editButtonView.pageRemoved.attach(function(source, args){
					_this.removePageFromView(args);
				});

				editButtonView.pageTitleEdited.attach(function(source, args) {
					console.log("View recieved edit event" + args);
					_this.editPageTitle(args.id, args.title);
				});

				document.getElementById('page-tab-'+ this._buttonViews[id]).addEventListener('click', function() {
					pageId = this.id.split("-")[2];
					_this.showTabWithId(pageId);
					console.log("Clicked page tab with id " + pageId)
				});
			}

			this.showTabWithId(page.id);
			
		},

		removePageFromView: function(pageId) {
			console.log("Page remove notification for "  + pageId);
			this.pageRemoved.notify(pageId);
		},

		editPageTitle: function(pageId, pageTitle) {
			console.log("New page title for " + pageId + " is " + pageTitle);
			this.pageEdited.notify({id: pageId, title:pageTitle});
		}
	};

	return SiteView;
});
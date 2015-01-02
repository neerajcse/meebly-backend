require(["observer/event", "Model/SiteModel", "View/SiteView", "Controller/SiteController", "View/TemplateButtonView" ,"Stub/DAO"], 
	function(Event, SiteModel, SiteView, SiteController, TemplateButtonView, DAO){
		
		var addButtonElement = {
			'nameField' : document.getElementById('name-field'),
			'addButton' : document.getElementById('add-button'),
		};
		//console.log("test");
		var templateButton = new TemplateButtonView(addButtonElement);


		var model = new SiteModel([]);
		console.log("registering DAO");
		var dao = new DAO("/", model);
		var element = {
			'domElement' : document.getElementById("page-contents"),
			'pageTabs' : document.getElementById("page-tabs"),
			'sideBarWidget' : document.getElementById("templates-widget"),
		};

		var view = new SiteView(model, element, templateButton);
		var controller = new SiteController(model, view);

		view.show();
});
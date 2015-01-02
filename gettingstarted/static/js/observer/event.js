define(function() {
	function Event(observant) {
		this._observant = observant;
		this._observers = [];
	}

	Event.prototype = {
		attach: function(observer) {
			this._observers.push(observer);
			console.log("Adding observer to " + this._observant);
		},

		notify: function(args) {
			// Works for ECMA5 compliant browsers only.
			/**this._observant.forEach(function(callee) {
				callee(this._observant, args);
			});**/

			
	        for (index = 0; index < this._observers.length; index += 1) {
	            this._observers[index](this._observant, args);
	        }
		}
	};

	return Event;
});
	
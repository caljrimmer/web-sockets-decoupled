define(["store",'jquery'], function (store,jquery) {
	
	var request,success;
	                                         
	beforeEach(function() {
		jasmine.Ajax.useMock();    
		_ec_baseurl = '../../../public/js/vendor/';
	});
	
    describe("Evercookie", function () {

        it("Get Evercookie if not found the return undefined", function() {
			store.get('_id',function(value){
				if(typeof(value) === 'undefined'){
					expect(value).not.toBeDefined();
				}
			});
        });

		it("If no Evercookie set up userid, new User Model and new Evercookie", function() {
			
			var TestResponses = {
				success: {
					status: 200,
					responseText: '{_id:1234456}'
				}  
			};
			
			success = jasmine.createSpy('success');
			store.userCheck(); 
			request = mostRecentAjaxRequest();
			console.log(request)
			
			expect(store.userid).not.toBe("");
			expect(store.user.get('_id')).toEqual(store.userid);
			expect(store.get('_id')).toEqual(store.userid);
        });

    });

});
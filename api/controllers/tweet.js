var twitter = require('twitter'),
	_ = require('underscore');
	
exports.types = ['market','stock','share','bond','currency','fund'];

exports.stream = function() {

	var twit = new twitter({
		consumer_key : "tjSBHE8FcBsESMIZiq19lQ",
	    consumer_secret : "4D9zWIULcY66CGXlJ6MncuPjFRcdmLhZX1kBu4Osk4",
	    access_token_key: '786950970-XEORETwcy2a2vOGjPoMKGmjnCwxE6c4Zr88jrLFu',
	    access_token_secret: 'EBD9IrZrKdx3dj6v9QBAfRQsKi0dJ8m8nvsw0Lz4'
	});

	twit.stream('statuses/filter', {track:['buy','sell']}, function(stream) {
	
	    stream.on('data', function(tweet) {
		
			var norm = {
				text : tweet.text.toLowerCase(),
				sell : false,
				buy : false,
				type : ""
			}
			
			var typeCheck = function typeCheck(){
				_.each(exports.types,function(item){
					if(norm.text.indexOf(item) !== -1){
						norm.type = item;
						eventEmitter.emit('tweet', norm);
						console.log(norm);
					}
				})
			}
			
			if(norm.text.indexOf('buy') !== -1){
				norm.buy = true;
			}
			
			if(norm.text.indexOf('sell') !== -1){
				norm.sell = true;
			}
			
			typeCheck();
			
	    });
	
		stream.on('error', function(error) {
           	console.log(error.message);
	    });
	
		stream.on('end', function(resp,error) { 
		    console.log("wave goodbye... " + resp.statusCode + " ::: "+ new Date());
	    });
	
	});  

}
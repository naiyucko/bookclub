'use strict';

function clickHandler (db) {
   var clicks = db.collection('clicks');
	var usernames = db.collection('usernames');
	var polls = db.collection('polls');
   this.getClicks = function (req, res) {

      var clickProjection = { '_id': false };

      usernames.findOne({'username': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
            res.json(result);
         } else {
            
         }
      });
   };
   
   this.getPolls = function (req, res) {

      var clickProjection = { '_id': false };

      polls.find({'user': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   };
   
   this.getTradesi = function (req, res) {

      var clickProjection = { '_id': false };

      polls.find({'trade': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   };
   
   this.getTradesm = function (req, res) {

      var clickProjection = { '_id': false };

      polls.find({'user': req.cookies.username, 'trade' :{$ne: ''}}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   };
   
   this.getBooks = function(req, res, next) {
      var clickProjection = { '_id': false };
      polls.find({'user': req.cookies.username}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   }
   
   this.getAllBooks = function(req, res, next) {
      var clickProjection = { '_id': false };
      polls.find({}, {}, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
         	result.toArray(function (err, result) {
         		if (err) {
            		throw err;
         		}
         		res.json(result);
         	})
            
         } else {
            
         }
      });
   }

   this.pollVote = function (req, res) {
   	var answer = req.body.poll.toString();
   	var rname = decodeURI(req.params.name).toString();
	var rtitle = decodeURI(req.params.ptitle).toString();
	if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
   	var query = {};
   	query[answer] = parseInt(1);
      polls.findAndModify({'user': rname, 'title' : rtitle}, {}, { $inc:  query }, function (err, result) {
         if (err) {
            throw err;
         }

         res.redirect('/');
      });
   };

   this.updateProfile = function (req, res) {
      
      usernames.update({'username': req.cookies.username}, {$set: {'fullname': req.body.name, 'city': req.body.City, 'state': req.body.State }}, function (err, result) {
         if (err) {
            throw err;
         }
         res.redirect('/');
      });
   };
   
   this.tradeBook = function (req, res) {
      polls.update({'title': req.body.stuff}, {$set: {'trade': req.cookies.username}}, function (err, result) {
         if (err) {
            throw err;
         }
         res.redirect('/');
      })
   }
   
   this.cancelTrade = function (req, res) {
      polls.update({'title': req.body.stuff}, {$set: {'trade': ''}}, function (err, result) {
         if (err) {
            throw err;
         }
         res.redirect('/');
      })
   }
   
   this.addUser = function (req, res, next) {
   		usernames.insert({ 'username': req.body.login, 'password': req.body.password, 'fullname': '', 'city': '', 'state': '' }, function (err) {
               if (err) {
                  throw err;
               }
            });
            next();
	};
	
	this.createPoll = function (req, res, next) {
		var rtitle = decodeURI(req.body.title).toString();
		var rimage = decodeURI(req.body.image).toString();
		var tempob = {'user' : req.cookies.username, 'title' : req.body.title, 'image': req.body.image, 'trade': ''};
		polls.insert(tempob, function (err) {
               if (err) {
                  throw err;
               }
               var urlgo = "/";
               res.redirect(urlgo);
            });
	}
	
	this.loginCheck = function (req, res, next) {
   		usernames.find({ 'username': req.body.login, 'password': req.body.password }, function (err, result) {
               if (err) {
                  throw err;
               }
               result.toArray(function (err, result) {
               		if (err){
               			throw err;
               		}
               		
	               	if (result.length === 1) {
	               		res.cookie("username" , req.body.login);
	               		res.redirect('/');
	               }
	               else {
	               		res.redirect('/login');
	               }
               })
               
            });
	};
	
	this.isLogged = function (req, res, next) {
		if (req.cookies.username)
		{
			next();
		}
		else
		{
			res.redirect('/login');
		}
	};
	
	this.displayPoll = function (req, res, next) {
		var clickProjection = { '_id': false };
		var rname = decodeURI(req.params.name).toString();
		var rtitle = decodeURI(req.params.ptitle).toString();
		if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
		polls.findOne({'user': rname, 'title' : rtitle}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }
         if (result) {
            res.json(result);
         } else {
         }
      });
	}
	
	this.viewPoll = function (req, res, next) {
		var clickProjection = { '_id': false };
		var rname = decodeURI(req.params.name).toString();
		var rtitle = decodeURI(req.params.ptitle).toString();
		if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
		polls.findOne({'user': rname, 'title' : rtitle}, clickProjection, function (err, result) {
         if (err) {
            throw err;
         }

         if (result) {
            res.json(result);
         } else {
         }
      });
	}
	
	this.deletePoll = function (req, res, next) {
		var rname = decodeURI(req.params.name).toString();
		var rtitle = decodeURI(req.params.ptitle).toString();
		if (req.params.ptitle.endsWith('?') && !rtitle.endsWith('?')) {
			rtitle += "?";
		}
		polls.remove({'user': rname, 'title' : rtitle}, function (err, result) {
			if (err) {
            throw err;
         }
         res.redirect('/');
		});
	}
}

module.exports = clickHandler;
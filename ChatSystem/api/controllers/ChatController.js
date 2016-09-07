/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index:function(req, res){
        var data = req.params.all();
        if(req.isSocket && req.method === 'POST'){
            Chat.create({user: data.user, message: data.message}).exec(function(err, result){
                if(err){
                    sails.log(err);
                    sails.log("Error occurred in database operation");
                }else{
                    Chat.publishCreate({id: result.id, message: data.message, user: data.user});
                }
            });
        }else if(req.isSocket){
            Chat.watch(req.socket);
            sails.log('User subscribed to ' + req.socket.id);
        }
        if(req.method === 'GET'){
            Chat.find().exec(function(err, result){
                if(err){
                    sails.log(err);
                    sails.log("Error occurred in database operation");
                }else{
                    res.send(result);
                }
            });
        }
    }
};


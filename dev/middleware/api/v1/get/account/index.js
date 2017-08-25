module.exports = function(io, req, res, Fighters) {

    var input = io.read(req),
        session = input.session;

    if(!!session == false) {
        return io.write(res, null, { result: 4 })
    }
    
    var id = session.user;
    
    if(!!id == false) {
        return io.write(res, null, { result: 4 })
    }

    Fighters.findOne({ _id: id }, function (err, user) {

        console.error('Account (GET) Error:', err);

        if(!!err) {
            return io.write(res, null, { result: 4 })
        }

        if(!!user == false) {
            return io.write(res, null, { result: 1 })
        }

        return io.write(res, {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            sex: user.sex ? 'm' : 'f',
            dateBirth: user.dateBirth
        })
    });

};
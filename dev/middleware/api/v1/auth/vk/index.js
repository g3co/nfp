module.exports = function(Fighters, io, profile, done) {

    profile = profile._json;

    Fighters.findOne({ vkID: profile.id }, function(err, user) {

        if(!!err) {
            return done(null, null)
        }

        if(!!user) {
            return done(null, user);
        }

        var _bdate = profile.bdate.split('.');

        user = new Fighters({
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatar: profile.photo || '',
            sex: profile.sex == 2 ? 1 : 0,
            email: profile.email || '(none)',
            dateBirth: (new Date(+_bdate[2], +_bdate[1]-1, +_bdate[0], 0, 0, 0, 0)).toISOString(),
            vkID: profile.id
        });

        user.save(function(err, user) {
            if(!!err) {
                return io.write(0, { result: 1 })
            }

            return done(null, user)
        })

    });
};
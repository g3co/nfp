module.exports = function(Fighters, io, profile, done) {

    profile = profile._json;
    
    var _bdate = profile.bdate.split('.'),
        newPromouter = {
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatar: profile.photo || '',
            sex: profile.sex == 2 ? 1 : 0,
            email: profile.email || '(none)',//@todo
            dateBirth: (new Date(+_bdate[2], +_bdate[1]-1, +_bdate[0], 0, 0, 0, 0)).toISOString(),
            vkID: profile.id,
            instagramID: '123',//@todo
            facebookID: '222'//@todo
        };

    Fighters.findOne(
        { vkID: profile.id },
        function(err, user) {
    
            if(!!err) {
                return done(err, null)
            }
    
            if(!!user) {
                return done(null, user);
            }
    
            user = new Fighters(newPromouter);
    
            user.save(function(err, user) {
                if(!!err) {
                    return done(err, null)
                }
    
                return done(null, user)
            })
    
        }
    );
};
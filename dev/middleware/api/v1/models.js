module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
        Places,
        Fighters,
        Sparrings;

    Places = new Schema({

    });

    Fighters = new Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        nickname: {type: String},
        avatar: {type: String, required: true},
        sex: {type: Boolean, required: true},
        email: {type: String, required: true},
        conditions: {
            height: {type: Number, required: true, min: 145, max: 220, default: 187},
            weight: {type: Number, required: true, min: 0, max: 8, default: 0}
        },
        dateBirth: {type: Date, required: true, default: Date.now},
        skills: {
            armyDogFight: {type: Boolean, required: true, default: false},
            brazilianJiuJitsu: {type: Boolean, required: true, default: false},
            combatSambo: {type: Boolean, required: true, default: false},
            boxing: {type: Boolean, required: true, default: false},
            wrestling: {type: Boolean, required: true, default: false},
            grappling: {type: Boolean, required: true, default: false},
            kickboxing: {type: Boolean, required: true, default: false},
            mma: {type: Boolean, required: true, default: false},
            muayThai: {type: Boolean, required: true, default: false}
        },
        lastGeo: {
            position: {
                lat: {type: Number},
                lng: {type: Number}
            },
            accuracy: {type: Number}
        },
        updatedAt: {type: Date, default: Date.now, required: true},
        createdAt: {type: Date, default: Date.now, required: true},
        banned: {type: Boolean, required: true, default: 0}
    });

    Sparrings = new Schema({

    });

    return {
        Places: mongoose.model('Places', Places),
        Fighters: mongoose.model('Fighters', Fighters),
        Sparrings: mongoose.model('Sparrings', Sparrings)
    }
};
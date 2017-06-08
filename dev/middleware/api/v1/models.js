module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
    //Mixins
        _Position,
        _MartialArts,
        _updatedAt,
        _createdAt,
        _finishedAt,
    //Schemas
        Places,
        Fighters,
        Tournaments,
        Pairs;

    _Position = {
        position: {
            lat: {type: Number},
            lng: {type: Number}
        },
        accuracy: {type: Number}
    };
    _MartialArts = {
        armyDogFight: {type: Boolean, required: true, default: false},
        brazilianJiuJitsu: {type: Boolean, required: true, default: false},
        combatSambo: {type: Boolean, required: true, default: false},
        boxing: {type: Boolean, required: true, default: false},
        wrestling: {type: Boolean, required: true, default: false},
        grappling: {type: Boolean, required: true, default: false},
        kickboxing: {type: Boolean, required: true, default: false},
        mma: {type: Boolean, required: true, default: false},
        muayThai: {type: Boolean, required: true, default: false}
    };
    _updatedAt = {type: Date, default: Date.now, required: true};
    _createdAt = {type: Date, default: Date.now, required: true};
    _finishedAt = {type: Date};

    //Implementation
    Places = new Schema({
        place: {
            position: {
                lat: {type: Number, required: true},
                lng: {type: Number, required: true}
            },
            accuracy: {type: Number}
        },
        placeName: {type: String, required: true},
        cityName: {type: String, required: true},
        streetName: {type: String, required: true},
        zipCode: {type: Number, required: true},
        building: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        photo: {type: String, required: true},
        schedule: {
            0: {type: String, required: true},
            1: {type: String, required: true},
            2: {type: String, required: true},
            3: {type: String, required: true},
            4: {type: String, required: true},
            5: {type: String, required: true},
            6: {type: String, required: true}
        },
        //service fields
        updatedAt: _updatedAt,
        createdAt: _createdAt,
        unavailable: {type: Boolean, required: true, default: false}
    });

    Fighters = new Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        avatar: {type: String, required: true},
        sex: {type: Boolean, required: true},
        email: {type: String, required: true, index: true, unique: true},
        dateBirth: {type: Date, required: true},
        //additional fields
        nickname: {type: String},
        conditions: {
            height: {type: Number, required: true, min: 145, max: 220, default: 187},
            weight: {type: Number, required: true, min: 0, max: 8, default: 0}
        },
        skills: _MartialArts,
        stats: {
            wins: [(new Pointer('Pairs'))],
            loses: [(new Pointer('Pairs'))],
            draws: [(new Pointer('Pairs'))]
        },
        //service fields
        lastGeo: _Position,
        updatedAt: _updatedAt,
        createdAt: _createdAt,
        banned: {type: Boolean, required: true, default: false}
    });

    Tournaments = new Schema({
        name: {type: String, required: true},
        card: [(new Pointer('Pairs'))],
        kind: _MartialArts,
        place: _Position,
        placeName: {type: String, required: true},
        scheduled: {type: Date, required: true},
        //service fields
        updatedAt: _updatedAt,
        createdAt: _createdAt
    });

    Pairs = new Schema({
        red: (new Pointer('Fighters')),
        blue: (new Pointer('Fighters')),
        pointsBlue: {type: Number, required: true, default: 0},
        pointsRed: {type: Number, required: true, default: 0},
        result: {type: Number, required: true, default: 1},
        resultReason: {type: String, required: true, default: 'wait'},//TKO - 4, KO - 3, draw - 2, wait - 1, cancelled - 0
        rounds: {type: Number, required: true, default: 1},
        roundFinished: {type: Number, required: true, default: 0},
        timeEnd: {type: Number, required: true, default: 0.0},
        //service fields
        updatedAt: _updatedAt,
        createdAt: _createdAt,
        finishedAt: _finishedAt
    });

    //custom fields
    function Pointer(model) {
        return {type: Schema.Types.ObjectId, required: true, ref: model}
    }

    return {
        Places: mongoose.model('Places', Places),
        Fighters: mongoose.model('Fighters', Fighters),
        Tournaments: mongoose.model('Tournaments', Tournaments),
        Pairs: mongoose.model('Pairs', Pairs)
    }
};
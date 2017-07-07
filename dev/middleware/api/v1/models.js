module.exports = function(mongoose) {

    var Schema = mongoose.Schema,
    //predefines
        _now,
        _offset,
    //Mixins
        _Place,
        _Position,
        _MartialArts,
        _updatedAt,
        _createdAt,
        _finishedAt,
    //Schemas
        MapSynchronization,
        Places,
        Fighters,
        Tournaments,
        Pairs;

    _now = new Date();
    _offset = _now.getTimezoneOffset() * 3600;

    _Place = {
        type: [Number],
        index: '2d'
    };
    _Position = {
        position: _Place,
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
    _updatedAt = {type: Date, default: Date.now, required: true, offset: _offset};
    _createdAt = {type: Date, default: Date.now, required: true, offset: _offset};
    _finishedAt = {type: Date, offset: _offset};

    //Implementation
    MapSynchronization = new Schema({
        place: _Place,
        expiredAt: _finishedAt,
        createdAt: _createdAt
    });

    Places = new Schema({
        place: _Place,//[$place.geometry.location.lat,$place.geometry.location.lng]
        schoolType: {type: String, required: true},//$keyword
        placeName: {type: String, required: true},//$place.name
        address: {type: String, required: true},//$place.vicinity
        zipCode: {type: Number, required: true},//$place.address_components.each -> find 'postal_code'
        phoneNumber: {type: String, required: true},//$place.international_phone_number
        website: {type: String, required: true, default: ''},//$place.website
        schedule: [Schema.Types.Mixed],
        /*{
            close: {
                day : {type: Number},
                time: {type: String}
            },
            open: {
                day: {type: Number},
                time: {type: String}
            }
        }//$place.opening_hours.periods*/
        utc_offset: {type: Number, required: true, default: 0},//$place.utc_offset
        serviceID: {type: String, index: true, unique: true},//$place_id
        //service fields
        updatedAt: _updatedAt,
        createdAt: _createdAt,
        unavailable: {type: Boolean, required: true, default: false}
    });

    //GET PLACES: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=[$place]&radius=$radius&type=gym&keyword=$schoolType&key=YOUR_API_KEY
    //GET PLACE BY place_id: https://maps.googleapis.com/maps/api/place/details/json?placeid=$place_id&key=YOUR_API_KEY

    Fighters = new Schema({
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        avatar: {type: String, required: true},
        sex: {type: Boolean, required: true},
        email: {type: String, required: true, index: true, unique: true},
        dateBirth: {type: Date, required: true},
        //sign fields
        vkID: {type: Number, index: true, unique: true},
        instagramID: {type: Number, index: true, unique: true},
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
        lastGeo: _Place,
        updatedAt: _updatedAt,
        createdAt: _createdAt,
        banned: {type: Boolean, required: true, default: false}
    });

    Tournaments = new Schema({
        name: {type: String, required: true},
        card: [(new Pointer('Pairs'))],
        kind: _MartialArts,
        place: _Place,
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
        MapSynchronization: mongoose.model('MapSynchronization', MapSynchronization),
        Places: mongoose.model('Places', Places),
        Fighters: mongoose.model('Fighters', Fighters),
        Tournaments: mongoose.model('Tournaments', Tournaments),
        Pairs: mongoose.model('Pairs', Pairs)
    }
};
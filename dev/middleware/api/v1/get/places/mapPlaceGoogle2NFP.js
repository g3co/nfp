function mapPlaceGoogle2NFP(place, place_id, schoolType) {

    if(!!place == false) {
        return false
    }

    return {
        place: [place.geometry.location.lng, place.geometry.location.lat],
        schoolType: schoolType,
        placeName: place.name,
        address: place.vicinity,
        zipCode: +place.address_components
            .find(function(o, i, arr) {
                return !!o.types.toString().match(/postal_code/i)
            }).long_name || 0,
        phoneNumber: place.international_phone_number || '',
        website: place.website || '',
        schedule: !!place.opening_hours ? place.opening_hours.periods : [],
        utc_offset: place.utc_offset || 0,
        serviceID: place_id
    }

}

module.exports = mapPlaceGoogle2NFP;
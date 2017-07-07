function mapPlace(place) {
    return {
        location: place.place,
        school: place.schoolType,
        name: place.placeName,
        address: place.address,
        zip: place.zipCode,
        phone: place.phoneNumber,
        website: place.website,
        utc_offset: place.utc_offset,
        schedule: place.schedule
    }
}

module.exports = mapPlace;
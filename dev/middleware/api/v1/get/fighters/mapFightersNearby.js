function mapFightersNearby(fighter) {
    return {
        id: fighter._id,
        photo: fighter.avatar,
        position: fighter.lastGeo
    }
}

module.exports = mapFightersNearby;
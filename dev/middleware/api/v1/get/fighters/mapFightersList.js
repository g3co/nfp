function mapFightersList(fighter) {
    return {
        id: fighter._id,
        firstName: fighter.firstName,
        lastName: fighter.lastName,
        photo: fighter.avatar
    }
}

module.exports = mapFightersList;
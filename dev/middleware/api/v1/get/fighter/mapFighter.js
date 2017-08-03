function mapFighter(fighter) {
    return {
        firstName: fighter.firstName,
        lastName: fighter.lastName,
        avatar: fighter.avatar,
        sex: fighter.sex ? 'm' : 'f',
        dateBirth: fighter.dateBirth,
        stats: fighter.stats,
        skills: fighter.skills,
        conditions: fighter.conditions,
        gym: !!fighter.trainingAt ? { id: fighter.trainingAt._id, name: fighter.trainingAt.placeName } : {},
        friends: !!fighter.friends ? fighter.friends.map(function(friend) { return friend._id }) : []
    }
}

module.exports = mapFighter;
function mapFighter(fighter) {
    return {
        firstName: fighter.firstName,
        lastName: fighter.lastName,
        avatar: fighter.avatar,
        sex: fighter.sex ? 'm' : 'f',
        dateBirth: fighter.dateBirth,
        stats: fighter.stats,
        skills: fighter.skills,
        conditions: fighter.conditions
    }
}

module.exports = mapFighter;
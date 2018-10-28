var roleRepair = {
    run: function(creep) {
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        
        if(creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES);
            var damaged = _.filter(targets, (structure) => 
                structure.structureType != 'constructedWall' && structure.structureType != 'rampart' && structure.hits < 0.95*structure.hitsMax || 
                structure.structureType == 'constructedWall' && structure.hits < 0.00005*structure.hitsMax ||
                structure.structureType == 'rampart' && structure.hits < 0.2 * structure.hitsMax);
            console.log(damaged);
            if(damaged.length > 0) {
                if(creep.repair(damaged[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damaged[0]);
                }
            }
        }
        else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER &&
                                structure.store[RESOURCE_ENERGY] >= creep.carryCapacity);
                    }
            });
            if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.amount) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
            
        }
    }
};

module.exports = roleRepair;
var roleBuilder = {

    /** @param {Creep} creep  **/
    
    run: function(creep) {
        
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        
        if(creep.memory.building) {
            var construction = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(construction.length > 0) {
                if(creep.build(construction[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction[0]);
                }
            }
          
        }
        else {
                    var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }});
            if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.amount) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
};

module.exports = roleBuilder;
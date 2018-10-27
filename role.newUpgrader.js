var roleNewUpgrader = {
    run: function(creep, container) {
         if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            console.log(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy));
            if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.energy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
};

module.exports = roleNewUpgrader;
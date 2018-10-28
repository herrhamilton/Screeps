var roleRunner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }});
        var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
                    }
            });
            
            if (extensions.length > 0) {
                console.log('Extensions!');

                
                        if(creep.carry.energy < creep.carryCapacity) {
                            console.log('fill me');

                            
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
            if(droppedEnergy.length > 0) {
                console.log('get dropped energy!');

               
                creep.say('😡' , true);
                if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    console.log('Ill go to dropped energy' );

                    creep.moveTo(droppedEnergy[0]);
                }
            }
            else {
                if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.amount) == ERR_NOT_IN_RANGE) {
                    console.log('energy from container into extension');

                    creep.moveTo(container);
                }
            }
            
        }
                
                else if(creep.transfer(extensions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    console.log('now fill ext');

                    creep.moveTo(extensions[0]);
                }
            }
            else if(Game.spawns['Home'].energy < Game.spawns['Home'].energyCapacity) {
                console.log('wanna fill spawn');

                
                        if(creep.carry.energy < creep.carryCapacity) {
                            console.log('gotta get stuff');

            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
            if(droppedEnergy.length > 0) {
                console.log('droped stuff and home');

                creep.say('😡' , true);
                if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    console.log('going to dropped stuff ');

                    creep.moveTo(droppedEnergy[0]);
                }
            }
            else {
                if(creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity - creep.carry.amount) == ERR_NOT_IN_RANGE) {
                    console.log('get energ from container for spawn');

                    creep.moveTo(container);
                }
            }
            
        }
                
                
                 else if(creep.transfer(Game.spawns['Home'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     console.log('go to spawn');

                    creep.moveTo(Game.spawns['Home']);
                 }
            }
        
        else {
           
            
            if(creep.carry.energy < creep.carryCapacity) {
                
                var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
            if(droppedEnergy.length > 0) {
                console.log('cleaning up....');

                creep.say('😡' , true);
                if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy[0]);
                }
            }
            }
            
            else {
                container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER &&
                                structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                    }});
                    console.log(container);
                    if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        console.log('stashing in container');
                        creep.moveTo(container);
                    }
            }
        }
    }
};

module.exports = roleRunner;
var roleUpgrader = require('role.newUpgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleRunner = require('role.runner');
var roleRepair = require('role.repair');
var roleControlMiner = require('role.controlMiner');

module.exports.loop = function () {
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var spawn = Game.spawns['Home'];
    var contrSrc = Game.getObjectById('5bbcab639099fc012e633690');
    var contrContainer = Game.getObjectById('5bd4574000321c253c6e2165');
    var spawnSrc = Game.getObjectById('5bbcab639099fc012e633691');
    var container = Game.getObjectById('5bd4141c9a59f12a128f481d');
    var containerRight = Game.getObjectById('5bd4405620893f2fe36da48e');
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var runners = _.filter(Game.creeps, (creep) => creep.memory.role == 'runner');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var controlMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'controlMiner');
    
    var minerCount = 1;
    var runnerCount = 2;
    var builderCount = 3;
    var upgraderCount = 1;
    var repairerCount = 3;
    var controlMinerCount = 1;

    if (spawn.room.energyAvailable >= 550) {
        if(miners.length < minerCount) {
            spawn.spawnCreep( [WORK,WORK,WORK,WORK,WORK,MOVE], 'Miner' + miners.length, { memory: { role: 'miner' }});
        }
        else if(controlMiners.length < controlMinerCount) {
            spawn.spawnCreep( [WORK,WORK,WORK,WORK,WORK,MOVE], 'CMiner' + miners.length, { memory: { role: 'controlMiner' }});
        }
        else if(runners.length < runnerCount) {
            spawn.spawnCreep( [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'Runner2' + runners.length, { memory: { role: 'runner' }});
        }
        else if(upgraders.length < upgraderCount) {
            spawn.spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 'Upgrader' + upgraders.length, { memory: { role: 'upgrader' }});
        }
        else if(repairers.length < repairerCount) {
            spawn.spawnCreep( [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], 'Repairer' + repairers.length, { memory: { role: 'repairer'}});
        }
        else if(builders.length < builderCount && spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            spawn.spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'Builder' + builders.length, { memory: { role: 'builder' }});
        }
    } 
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, contrContainer);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep, spawnSrc, container);
        }
        if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'controlMiner') {
            roleControlMiner.run(creep, contrSrc, contrContainer);
        }
    }
}
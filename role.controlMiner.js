var roleControlMiner = {

      /** @param {Creep} creep **/
    run: function(creep, source, container) {
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
        }
    }
};
module.exports = roleControlMiner;
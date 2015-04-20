var config  = require( "./config" );
var shuffle = require( "mout/array/shuffle" );

exports.generate = function( x, y, context ) {

    var self = {};
    var t = 0;
    var neighbors;
    var cornsers;
    var available = true;

    self.x = x;
    self.y = y;

    self.setNeighbors = function( array ) {
        neighbors = shuffle( array );
    };

    self.setCorners = function( array ) {
        cornsers = array;
    };

    self.render = function() {
        available = false;

        if ( config.hyperlapse ) t = 1;
        else t = Math.min( t, t = config.speed );

        var size = Math.ceil( config.size * t );
        var half = Math.ceil( config.size * t * 0.5 );

        context.beginPath();
        context.rect( - half , -half, size, size );
        context.fill();
        context.stroke();
    };

    self.isComplete = function() {
        return t >= 1;
    };

    self.getAvailableNeighbor = function() {
        var current;

        for ( var i = neighbors.length - 1; i >= 0; i-- ) {
            current = neighbors[ i ];

            if ( current.hasSaveSurrounding( self ) ) {
                return current;
            }
        }

        return null;
    };

    self.hasSaveSurrounding = function( entrence ) {

        var i, current;

        for ( i = neighbors.length - 1; i >= 0; i-- ) {
            current = neighbors[ i ];

            if ( current === entrence ) continue;

            if ( ! current.isAvailable() ) return false;
        }

        for ( i = cornsers.length - 1; i >= 0; i-- ) {
            current = cornsers[ i ];

            if ( current.isAdjacent( entrence ) ) continue;

            if ( ! current.isAvailable() ) return false;
        }

        return true;
    };

    self.isAdjacent = function( tile ) {

        for ( var i = neighbors.length - 1; i >= 0; i-- ) {
            if ( neighbors[ i ] === tile ) return true;
        }

        return false;

    };

    self.updateAvailability = function( value ) {
        available = available && value;
    };

    self.isAvailable = function() {
        return available;
    };

    return self;
};
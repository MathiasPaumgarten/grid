var grid   = require( "./grid" );
var stage  = require( "./stage" );
var config = require( "./config" );
var mask   = require( "./mask" );

var canvas = document.querySelector( "#canvas" );
var context = canvas.getContext( "2d" );

function init() {

    onResize();
    clear();

    grid.setContext( context );
    grid.generate( config.gridWidth, config.gridHeight );
    grid.mask( mask );
    grid.start();

    render();
}

function render() {
    requestAnimationFrame( render );

    grid.render();
}

function clear() {
    context.clearRect( 0, 0, stage.width, stage.height );
}

function onResize() {
    canvas.width = stage.width = window.innerWidth;
    canvas.height = stage.height = window.innerHeight;
}

init();
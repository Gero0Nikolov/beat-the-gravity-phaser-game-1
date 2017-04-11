var game = new Phaser.Game( "100", "100", Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render } );
var cursors;
var window_height = window.outerHeight;
var score = 0;
var finished = false;

function preload() {
    game.load.image( "human", "assets/human.png" );
    game.load.image( "line", "assets/line.png" );
}

function create() {

    // Set physics
    game.physics.startSystem( Phaser.Physics.ARCADE );

    // Create object
    var human = game.add.sprite( game.world.centerX, game.world.centerY, "human" );
    human.anchor.setTo( 0.5, 0.5 );
    human.scale.setTo( 0.1, 0.1 );

    var line = game.add.sprite( game.world.centerX, game.world.centerY, "line" );
    line.anchor.setTo( 0.5, 0.5 );
    line.scale.setTo( 0.1, 0.1 );

    // Add physics
    game.physics.enable( [ human ] );

    human.body.collideWorldBounds = true;
    human.body.bounce.y = 0.8;
    human.body.gravity.y = 1000;
    human.inputEnabled = true;

    // Add controls
    game.input.mouse.capture = true;

    human.events.onInputDown.add(function(){
        human.y -= 20;

        if ( window_height - human.y > score ) {
            score = window_height - human.y;
            line.y = human.y;
            game.debug.text( "High Score: "+ score, 300, 132 );

            if ( score >= window_height )  {
                finished = true;
                game.paused = true;
            }
        }
    }, this);

    game.input.onDown.add( function(){
        if ( finished == true ) { window.location.reload( true ); }
    }, this );
}

function update() {}

function render() {}

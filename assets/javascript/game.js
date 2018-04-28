$(document).ready(function() {
    $(".newGame").hide();

    var selectPlayer = setTimeout(function() {
        alert("Please select a Player!");
    }, 1000);

	var PickedCharacter;
	var enemyChar;
	var fightingEnemy = false;
	var playerWon;
	var enemies = [];


    var rey = {
            name:"rey",
            display: "Rey",
            healthPoints: 100,
            attackPower: 5,
            counterAttack: 8,
            image: "assets/images/rey.png",

    };

    var yoda = {
            name:"yoda",
            display: "Yoda",
            healthPoints: 100,
            attackPower: 10,
            counterAttack: 10,
            image: "assets/images/Yoda.png",

    };

    var lukeskywalker = {
            name:"lukeskywalker",
            display: "Luke Skywalker",
            healthPoints: 100,
            attackPower: 15,
            counterAttack: 12,
            image: "assets/images/luke_skywalker.png",

    };

    var kyloren = {
            name:"kyloren",
            display: "Kylo Ren",
            healthPoints: 100,
            attackPower: 20,
            counterAttack: 8,
            image: "assets/images/kylo_ren.png",


    };

    var characters = [ rey, yoda, lukeskywalker, kyloren ]

    $(".playerCharPick").on("click", function() {
		PickedCharacter = eval($(this).data("obj"));
		$("#battleArea").append('<img src="'+ PickedCharacter.image + '" class="image" data-obj="' + PickedCharacter.name + '">');
		$("#battleArea").show();
		updatePlayerStats();
		$("#playerCharSelection").empty();
		$("#result").html("");
		for (i=0;i<characters.length;i++) {
			if (characters[i].name !== PickedCharacter.name) {
				$("#enemyCharSelection").append('<div class = "col-md-3 properties"><img src="' + characters[i].image + '" class="enemyCharPick" data-obj="' + characters[i].name + '"></div>');
			}
		}

	});

$("#enemyCharSelection").on("click", ".enemyCharPick", function() {
    $(".newGame").show();
    if (!fightingEnemy) {
        enemyChar = eval($(this).data("obj"));
        $("#enemyBattle").append('<img src="'+ enemyChar.image + '" class="image" id="enemyChar" data-obj="' + enemyChar.name + '">');
        $("#enemyBattle").show();
        updateEnemyStats();
        $("#attack").show();
        $(this).hide();
        enemies.push(enemyChar);
        fightingEnemy = true;
    }
});
    
    $(".attack").on("click", function() {
		if (fightingEnemy == true) {
            fight();
            checkForPlayerLoss();
            checkForEnemyLoss();
		}
		else {
            alert("Select the next player!");
		}
	});


	$(".newGame").on("click", function() {
		location.reload();
    });

    function checkForPlayerLoss(){
        if (PickedCharacter.healthPoints <= 0) { 
            playerLoss = false;
            $("#result").html("You lose!");
            $(".attack").hide();
        }
    }
    
    function fight(){
        enemyChar.healthPoints -= PickedCharacter.attackPower;
        PickedCharacter.attackPower += PickedCharacter.attackPower;
        PickedCharacter.healthPoints -= enemyChar.counterAttack;
        updateEnemyStats();
        updatePlayerStats();
    }


	function updatePlayerStats() {
		$("#playerHealth").html("HP: " + PickedCharacter.healthPoints + "<br />Attack: " + PickedCharacter.attackPower);
		$("#playerName").html(PickedCharacter.display);
    }

    function checkForEnemyLoss(){
        if (enemyChar.healthPoints <= 0) { 
            $("#enemyChar").remove();
            $("#enemyName").html("");
            $("#enemyHealth").html("");
            fightingEnemy = false;
            if (enemies.length == 3) { 
                var enemyLiving = false;
                for (i=0; i<enemies.length;i++) {
                    if (enemies[i].healthPoints > 0) {
                        enemyLiving = true;
                    }
                }
                if (enemyLiving == false) {
                    playerWon = true;
                    $(".attack").hide();
                    alert("WINNER WINNER CHICKEN DINNER!");
                }
            }
        }
    }
    
	function updateEnemyStats() {
		$("#enemyHealth").html("HP: " + enemyChar.healthPoints + "<br />Attack: " + enemyChar.attackPower);
		$("#enemyName").html(enemyChar.display);
	}


})

let rules = [
    {
        "ruleNr": "1",
        "ruleText": "Once a player has awakened their cursed technique, they must declare their participation in the Culling Game at the colony of their choice within 19 days.",
        "ruleAuthor": "Base Rule"
    },
    {
        "ruleNr": "2",
        "ruleText": "Any player who breaks the previous rule will be subject to cursed technique removal.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "3",
        "ruleText": "Non-players who enter a colony become players at the moment of entry and will be considered to have declared participation in the Culling Game.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "4",
        "ruleText": "Players score points by ending the lives of other players.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "5",
        "ruleText": "The point value of a player's life is decided by the game master. As a general rule, sorcerers are worth 5 points and non-sorcerers are worth one point.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "6",
        "ruleText": "Excluding the point value of the player's own life, a player can expend 100 points to negotiate with the game master and add a new rule to the game.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "7",
        "ruleText": "In accordance with rule 6, the game master must accept any proposed new rule as long as it doesn't have a long-lasting effect on the game.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "8",
        "ruleText": "If a player's score remains the same for 19 days, they will be subject to cursed technique removal.",
        "ruleAuthor": "Base Rule"
    },
        {
        "ruleNr": "9",
        "ruleText": "Players gain access to information on other players, such as their name, amount of points, number of rules added, and their current colony.",
        "ruleAuthor": "Hajime Kashimo"
    },
        {
        "ruleNr": "10",
        "ruleText": "Players may transfer any number of points between one another.",
        "ruleAuthor": "Hiromi Higuruma"
    }
];

function renderRules() {
  let temp, item, a, i;
  temp = document.getElementById("ruleTemplate");
  item = temp.content.querySelector("article");
  for (i = 0; i < rules.length; i++) {
    a = document.importNode(item, true);
    a.querySelector("h2").textContent = rules[i].ruleNr;
    a.querySelector("#content").textContent = rules[i].ruleText;
    a.querySelector("#author").textContent = rules[i].ruleAuthor;
    document.getElementById("gameRules").appendChild(a);
  }
}
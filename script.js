var playerCards = [];
var dealerCards = [];
var cards = {'0':'2h', '1':'3h', '2':'4h', '3':'5h', '4':'6h', '5':'7h',
'6':'8h', '7':'9h', '8':'10h', '9':'Jh', '10':'Qh', '11':'Kh', '12':'Ah',
'13':'2d', '14':'3d', '15':'4d', '16':'5d', '17':'6d', '18':'7d', '19':'8d',
'20':'9d', '21':'10d', '22':'Jd', '23':'Qd', '24':'Kd', '25':'Ad',
'26':'2s', '27':'3s', '28':'4s', '29':'5s', '30':'6s', '31':'7s', '32':'8s',
'33':'9s', '34':'10s', '35':'Js', '36':'Qs', '37':'Ks', '38':'As',
'39':'2c', '40':'3c', '41':'4c', '42':'5c', '43':'6c', '44':'7c', '45':'8c',
'46':'9c', '47':'10c', '48':'Jc', '49':'Qc', '50':'Kc', '51':'Ac'};
var cardVal = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9,
'1':10, 'J':10, 'Q':10, 'K':10, 'A':1};
var done = true;
var splitMode = 0;
var hand = false; //used in split mode, holds which hand is being used
var tempCards = []; //used in split mode to hold second hand cards
function deal() {
    done = false;
    playerCards = [];
    dealerCards = [];
    var dealer = document.getElementById("dealer");
    var player = document.getElementById("player");
    dealer.innerHTML = '<p id="totaldeal"></p>';
    player.innerHTML = '<p id="total"></p>';
    for (i = 0; i < 4; i++) {
        var cardEl = document.createElement("img");
        //var card = newCard();
        var card = '7h';
        if (i%2 == 0) {
            playerCards.push(card);
            cardEl.src = 'images/cards/' + card + '.png';
            player.appendChild(cardEl);
        } else {
            dealerCards.push(card);
            if (dealerCards.length < 2) {
                cardEl.src = 'images/cards/down.jpg'
                cardEl.width = '61';
                cardEl.height = '80';
                cardEl.id = 'flipped';
            } else {
                cardEl.src = 'images/cards/' + card + '.png';
            }
            dealer.appendChild(cardEl);
        }
    }
    var totalEl = document.getElementById("total");
    displayTotal(totalEl, playerCards);
}
function hit() {
    if (done) {
        alert("You must deal yourself a new hand.");
    } else {
        var player = document.getElementById("player");
        if (splitMode > 0) {
            player = hand;
        }
        var cards = hitHelper(player, playerCards);
        playerCards = cards;
        var totalEl = document.getElementById("total");
        checkBust(displayTotal(totalEl, playerCards), "You busted, the dealer wins");
    }
}
function stand() {
    if (done) {
        alert("You must deal yourself a new hand.");
    } else if (splitMode > 0) {
        hand = document.getElementById("two");
        playerCards = tempCards;
        splitMode += 1;
        if (splitMode > 2) {
            splitMode = 0;
        }
    } else {
        var flipped = document.getElementById("flipped");
        var card = 'images/cards/' + dealerCards[0] + '.png';
        flipped.src = card;
        var totalEl = document.getElementById("totaldeal");
        var totals = displayTotal(totalEl, dealerCards);
        if (overSixteen(totals).length > 0) {
            winner(totals);
        } else {
            while (overSixteen(totals).length < 1) {
                var dealer = document.getElementById("dealer");
                var cards = hitHelper(dealer, dealerCards);
                dealerCards = cards;
                totals = displayTotal(totalEl, dealerCards);
            }
            winner(totals);
        }
    }
}
function overSixteen(vals) {
    return vals.filter(function(elem, i, array) {
        return elem > 16;
    });
}
function split() {
    if (done) {
        alert("You must deal yourself a new hand.");
    } else if (playerCards.length > 2) {
        alert("You can only split before you start hitting.");
    } else if (playerCards[0].substring(0, 1) !== playerCards[1].substring(0, 1)) {
        alert("You can only split when the cards have the same rank");
    } else {
        splitMode = 1;
        var player = document.getElementById("player");
        player.innerHTML = '<p id="one"></p> <p id="two"></p>'
        alert("When splitting, use the hit button until you are done hitting "+
        "the first hand, then use the stand button once to indicate you are "+
        "ready to hit on the next hand, then hit/stand normally")
        var one = document.getElementById("one");
        var two = document.getElementById("two");
        var oneCards = [playerCards[0]];
        var twoCards = [playerCards[1]];
        var cardOne = document.createElement("img");
        cardOne.src = 'images/cards/' + oneCards[0] + '.png';
        one.appendChild(cardOne);
        var cardTwo = document.createElement("img");
        cardTwo.src = 'images/cards/' + twoCards[0] + '.png';
        two.appendChild(cardTwo);
        hand = one;
        playerCards = oneCards;
        tempCards = twoCards;
    }
}
function newCard() {
    return cards[Math.floor(Math.random()*52)];
}
function displayTotal(totalEl, cards) {
    totalEl.innerHTML = '';
    var totals = getTotals(cards);
    for (i = 0; i < totals.length; i++) {
        totalEl.innerHTML += (' or ' + totals[i].toString());
    }
    totalEl.innerHTML = totalEl.innerHTML.substring(4, totalEl.innerHTML.length)
    return totals;
}
function getTotals(cards) {
    var totals = [0];
    for(i = 0; i < cards.length; i++) {
        var val = cards[i].substring(0, 1);
        if (val == 'A') {
            var newTotals = [];
            for (j = 0; j < totals.length; j++) {
                newTotals.push(totals[j] + 11);
                totals[j] += 1;
            }
            totals = totals.concat(newTotals)
            totals = removeDupAndBusts(totals);
        } else {
            for (j = 0; j < totals.length; j++) {
                totals[j] += cardVal[val];
            }
        }
    }
    totals = removeDupAndBusts(totals);
    return totals;
}
function removeDupAndBusts(arr) {
    return arr.filter(function(elem, i, array) {
        return array.indexOf(elem) == i && (array[i] < 22 || array.length < 2);
    });
}
function checkBust(totals, message) {
    var min = totals[0];
    for (i = 0; i < totals.length; i++) {
        if (totals[i] < min) {
            min = totals[i]
        }
    }
    if (min > 21) {
        alert(message);
        done = true;
    }
}
function hitHelper(player, cards) {
    var cardEl = document.createElement("img");
    var card = newCard();
    cards.push(card);
    cardEl.src = 'images/cards/' + card + '.png';
    player.appendChild(cardEl);
    return cards;
}
function winner() {
    var dealerTotals = getTotals(dealerCards);
    var playerTotals = getTotals(playerCards);
    var dealer = dealerTotals[0];
    var player = playerTotals[0];
    if (dealerTotals[1] < 22) {
        dealer = dealerTotals[1];
    }
    if (playerTotals[1] < 22) {
        player = playerTotals[1];
    }
    if (dealer > 21) {
        alert("The dealer busted, you win.")
    } else if (dealer > player) {
        alert("The dealer won.")
    } else if (player > dealer) {
        alert("You won!")
    } else {
        alert("You and the dealer pushed.")
    }
    done = true;
}

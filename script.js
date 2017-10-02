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
var done = false;
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
        var card = newCard();
        if (i%2 == 0) {
            playerCards.push(card);
            cardEl.src = 'cards/' + card + '.png';
            player.appendChild(cardEl);
        } else {
            dealerCards.push(card);
            if (dealerCards.length < 2) {
                cardEl.src = 'cards/down.jpg'
                cardEl.width = '61';
                cardEl.height = '80';
                cardEl.id = 'flipped';
            } else {
                cardEl.src = 'cards/' + card + '.png';
            }
            dealer.appendChild(cardEl);
        }
    }
    var totalEl = document.getElementById("total");
    checkBust(displayTotal(totalEl, playerCards)[0], "You busted, the dealer wins.");
}
function hit() {
    if (done) {
        alert("You must deal yourself a new hand.");
    } else {
        var player = document.getElementById("player");
        var cards = hitHelper(player, playerCards);
        playerCards = cards;
        var totalEl = document.getElementById("total");
        checkBust(displayTotal(totalEl, playerCards)[0], "You busted, the dealer wins");
    }
}
function stand() {
    if (done) {
        alert("You must deal yourself a new hand.");
    } else {
        var flipped = document.getElementById("flipped");
        var card = 'cards/' + dealerCards[0] + '.png';
        flipped.src = card;
        var totalEl = document.getElementById("totaldeal");
        var totals = displayTotal(totalEl, dealerCards);
        if (totals[1] > 16 || totals[0] > 16) {
            winner(totals);
        } else {
            while (totals[1] < 17 && totals[0] < 17) {
                var dealer = document.getElementById("dealer");
                var cards = hitHelper(dealer, dealerCards);
                dealerCards = cards;
                totals = displayTotal(totalEl, dealerCards);
            }
            winner(totals);
        }
    }
}
function newCard() {
    return cards[Math.floor(Math.random()*52)];
}
function displayTotal(totalEl, cards) {
    totalEl.innerHTML = '';
    var totals = getTotals(cards);
    totalEl.innerHTML += totals[0].toString();
    if (totals[1] != totals[0] && totals[1] < 22) {
        totalEl.innerHTML += (' or ' + totals[1].toString());
    }
    return totals;
}
function getTotals(cards) {
    var total = 0;
    var totalA = 0;
    for(i = 0; i < cards.length; i++) {
        var val = cards[i].substring(0, 1);
        if (val == 'A') {
            totalA = total + 11;
        } else {
            totalA += cardVal[val];
        }
        total += cardVal[val];
    }
    totals = [total, totalA];
    return totals;
}
function checkBust(total, message) {
    if (total > 21) {
        alert(message);
        done = true;
    }
}
function hitHelper(player, cards) {
    var cardEl = document.createElement("img");
    var card = newCard();
    cards.push(card);
    cardEl.src = 'cards/' + card + '.png';
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
    if (dealer > player) {
        alert("The dealer won.")
    } else if (player > dealer) {
        alert("You won!")
    } else {
        alert("You and the dealer pushed.")
    }
    done = true;
}

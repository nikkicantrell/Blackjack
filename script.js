function deal() {
    var cards = {'0':'2h', '1':'3h', '2':'4h', '3':'5h', '4':'6h', '5':'7h',
    '6':'8h', '7':'9h', '8':'10h', '9':'Jh', '10':'Qh', '11':'Kh', '12':'Ah',
    '13':'2d', '14':'3d', '15':'4d', '16':'5d', '17':'6d', '18':'7d', '19':'8d',
    '20':'9d', '21':'10d', '22':'Jd', '23':'Qd', '24':'Kd', '25':'Ad',
    '26':'2s', '27':'3s', '28':'4s', '29':'5s', '30':'6s', '31':'7s', '32':'8s',
    '33':'9s', '34':'10s', '35':'Js', '36':'Qs', '37':'Ks', '38':'As',
    '39':'2c', '40':'3c', '41':'4c', '42':'5c', '43':'6c', '44':'7c', '45':'8c',
    '46':'9c', '47':'10c', '48':'Jc', '49':'Qc', '50':'Kc', '51':'Ac'}
    var table = document.getElementById("table");
    var card = document.createElement("img");
    var number = cards[Math.floor(Math.random()*52)]
    card.src = 'cards/' + number + '.png'
    table.appendChild(card)
}

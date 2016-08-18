//Check cards number
if (JSON.parse(mycaAssistJSON.commonAppData).cardsInfoList.length >= 2) return;

//Check period indexs
window.List.getData().BPIndex

//Check active cards PMC
var pmc = +JSON.parse(window.mycaAssistJSON.commonAppData).cardsInfoList.filter(function (card) {
    return card.sortedIndex === window.NAV.CCC.iNActiveCard;
})[0].pmcGrp;
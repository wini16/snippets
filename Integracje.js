Omniture
//omniture integrations
mmcore.omniture('T44DCE_OffersRedesign_AB');
for opinion lab you should save to the global variable info about the campaign
like this
//Opinion lab intagration
window.max_Test_Recipe = 'T44DCE_OffersRedesign_AB: Offersbenef_' + mmcore.GenInfo['T44DCE_OffersRedesign_AB']['offersbenef'];

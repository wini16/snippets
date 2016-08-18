function campStr(camp) {
    let campaignName = camp.getName(),
        campaignInfo = camp.getExperience(),
        info = [],
        str, key;

    for (key in campaignInfo) {
        info.push(key + '_' + campaignInfo[key]);
    }

    str = campaignName + ':' + info.join(' | ');
    return str;
}
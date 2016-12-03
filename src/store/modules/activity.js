
let clientWidth = document.body.clientWidth;

function getFixedDataForActivity(activity) {
    let temp = {};
    temp.content = activity.content;
    temp.title = activity.title;
    temp.detail = activity.detail;
    temp.id = activity.id;
    temp.intro = activity.intro;
    temp.rdWidth = clientWidth;
    temp.rdHeight = clientWidth * 200 / 375;
    if (activity.pic) {
        temp.rdPic = `${activity.pic}?imageView2/1/w/${Math.floor(temp.rdWidth) * 2}/h/${Math.floor(temp.rdHeight) * 2}`;
    }
    return temp;
}

const activity = {
    getters: {
        activityItems: function(state, getters, rootState) {
            if (!rootState.isLoaded) {
                return [];
            } else {
                let result = [];
                rootState.requireData.activity.forEach(function(activity) {
                    let temp = getFixedDataForActivity(activity);
                    console.log(temp);
                    result.push(temp);
                });
                return result;
            }
        }
    }
};

module.exports = activity;
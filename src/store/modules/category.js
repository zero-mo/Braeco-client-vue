function getFixedDataForCategory(category) {
    let temp = {};

    let clientWidth = document.body.clientWidth;

    temp.id = category.id;
    temp.name = category.name;

    temp.largeWidth = Math.floor(clientWidth * 160 / 375);
    temp.largeHeight = temp.largeWidth;

    temp.smallWidth = 40;
    temp.smallHeight = 40;

    if (category.pic) {
        temp.smallPic = `${category.pic}?imageView2/1/w/${temp.smallWidth * 2}/h/${temp.smallHeight * 2}`;
        temp.largePic = `${category.pic}?imageView2/1/w/${temp.largeWidth * 2}/h/${temp.largeHeight * 2}`;
    }
    return temp;
}

const category = {
    getters: {
        categoryItems(state, getters, rootState) {
            if (!rootState.isLoaded) {
                return [];
            } else {
                let result = [];
                rootState.requireData.menu.categories.every(function(category) {
                    if (!category.display_flag) {
                        return true;
                    }
                    let temp = getFixedDataForCategory(category);
                    result.push(temp);
                    return true;
                });
                return result;
            }
        }
    }
};

module.exports = category;

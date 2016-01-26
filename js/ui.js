function imgLoaded(img) {
  var imgWrapper = img.parentNode.parentNode;
  imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
};

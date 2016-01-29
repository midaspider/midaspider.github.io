function imgLoaded(img) {
  var imgWrapper = img.parentNode;
  imgWrapper.className += imgWrapper.className ? ' loaded' : 'loaded';
};

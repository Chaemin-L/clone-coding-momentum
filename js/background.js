
// ImgNames are all number. Don't need to make array.
const imgNum = Math.floor(Math.random()*4);
const imgUrl = `url('img/${imgNum}.jpg')`;

document.body.style.backgroundImage = imgUrl;
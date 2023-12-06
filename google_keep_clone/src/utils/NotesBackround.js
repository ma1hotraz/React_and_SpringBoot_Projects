import cherry from '../images/notes_bg/cherry.png'
import flower from '../images/notes_bg/tropical_flower.jpg'
import oranges from '../images/notes_bg/oranges.jpg'

const imageList = [cherry, flower, oranges];

export const getRandomBg = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return `url(${imageList[randomIndex]})`;
}
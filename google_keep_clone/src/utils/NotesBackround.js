import cherry from '../images/notes_bg/cherry.png'
import flower from '../images/notes_bg/tropical_flower.jpg'
import oranges from '../images/notes_bg/oranges.jpg'
import travel from '../images/notes_bg/travel.jpg'
import music from '../images/notes_bg/music.jpg';  
import tree from '../images/notes_bg/tree.jpg';
import flowerPattern from '../images/notes_bg/flower_pattern.jpg';
import lilly from '../images/notes_bg/lilly.jpg';
import purpleFlower from '../images/notes_bg/purple_flower.jpg';
import violetFlower from '../images/notes_bg/violet_flower.jpg'
import warrior from '../images/notes_bg/warrior.jpg'
import swing from '../images/notes_bg/swing.gif';
import boat from '../images/notes_bg/boat.gif';
import leaves from '../images/notes_bg/leaves.gif';
import travel1 from '../images/notes_bg/travel1.gif';
import sunshine from '../images/notes_bg/sunshine.gif'


const imageList = [boat, cherry, flower, oranges, travel, music, tree,  warrior, flowerPattern, lilly, purpleFlower, violetFlower, leaves, sunshine, travel1, swing];

export const getRandomBg = () => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return `url(${imageList[randomIndex]})`;
}
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
  const name = countryInput.value.trim();
  if (name === '') {
    return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
  }
  fetchCountries(name)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      if (countries.length === 1) {
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
        countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
      } else if (countries.length >= 10) {
        alertTooManyMatches();
      } else {
        countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
      }
    })
    .catch(alertWrongName);
}

function renderCountryList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
        <li class = "country-list_item">
            <img class = "list country-list_flag" src = "${flags.svg}" alt = "Flag of ${name.official}"width = 80px height = 80px>
            <h2 class = "country-list_name">${name.official}</h2>
            </li>
            `;
    })
    .join('');
  return markup;
}

function renderCountryInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class = "country-info_list">
            <li class = "country-info_item"><p><b>Capital: </b>${capital}</p></li>
            <li class = "country-info_item"><p><b>Population: </b>${population}</p></li>
            <li class = "country-info_item"><p><b>languages: </b>${Object.values(languages).join(
              ', ',
            )}</p></li>
        </ul>
        `;
    })
    .join('');
  return markup;
}

function alertWrongName() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}


// (function() {

//   var width, height, canvas, ctx, circles, target, animateHeader = true;

//   // Main
//   initHeader();
//   addListeners();

//   function initHeader() {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       target = {x: 0, y: height};



//       canvas = document.getElementById('bubbles');
//       canvas.width = width;
//       canvas.height = height;
//       ctx = canvas.getContext('2d');

//       // create particles
//       circles = [];
//       for(var x = 0; x < width*0.9; x++) {
//           var c = new Circle();
//           circles.push(c);
//       }
//       animate();
//   }

//   function animate() {
//       if(animateHeader) {
//           ctx.clearRect(0,0,width,height);
//           for(var i in circles) {
//               circles[i].draw();
//           }
//       }
//       requestAnimationFrame(animate);
//   }

//   // Canvas manipulation
//   function Circle() {
//       var _this = this;

//       // constructor
//       (function() {
//           _this.pos = {};
//           init();
//           console.log(_this);
//       })();

//       function init() {
//           _this.pos.x = Math.random()*width;
//           _this.pos.y = height+Math.random()*100;
//           _this.alpha = 0.1+Math.random()*0.9;
//           _this.scale = 0.1+Math.random()*0.9;
//           _this.velocity = Math.random();
//       }

//       this.draw = function() {
//           if(_this.alpha <= 0) {
//               init();
//           }
//           _this.pos.y -= _this.velocity;
//           _this.alpha -= 0.0005;
//           ctx.beginPath();
//           ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
//           ctx.fillStyle = 'rgba(157,188,225,'+ _this.alpha+')';
//           ctx.fill();
//       };
//   }

// })();
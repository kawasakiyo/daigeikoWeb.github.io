var selector = 'div.arts-tate, div.arts-cube-mini, div.arts-cube-dai';

const grids = document.querySelectorAll(selector);

const futaTemplate = document.createElement('div');
futaTemplate.classList.add('futa');

const futas = [];

const main = document.querySelector('main');

for (var gr of grids) {
  const futaCopy = futaTemplate.cloneNode(true);
  if (Math.random() < 0.5){
    futaTemplate.classList.add('slided');
  }
  gr.appendChild(futaCopy);
  futas.push(futaCopy);

  grid_sizing(gr);
}

window.onresize = function(){
  for (var gr of grids) {
    grid_sizing(gr);
  }
}

function grid_sizing(grid) {
  var margin = main.clientWidth * 4 / 704;
  grid.style.margin = margin + 'px';
  if (grid.classList.contains('arts-cube-dai')){
    grid.style.height = grid.clientWidth / 331 * 321 + 'px';
  } else if (grid.classList.contains('arts-tate')){
    grid.style.height = grid.clientWidth / 161 * 321 + 'px';
  } else if (grid.classList.contains('arts-cube-mini')){
    grid.style.height = grid.clientWidth + 'px';
  }
}


setInterval(futaSlide, 5000);

function futaSlide(){
  for (var i=0; i < futas.length; i++) {
    futas[i].style.display = 'block';
    //const ur = uras[wRand[i]];
    setTimeout(() => {
      const toRight = futas[i].classList.contains('slided');

      //ur.animate(futaKey(!toRight, true) ,futaOpt(false, true));
      const slin = futas[i].animate(futaKey(!toRight, true) ,futaOpt(false, true));

      slin.onfinish = function(){
        //var target = fu.previousElementSibling;
        //fillWaku(target);

        //ur.animate( futaKey(toRight, false), futaOpt(false, false));
        futas[i].animate( futaKey(toRight, false), futaOpt(false, false));

        if (toRight) {
          futas[i].classList.remove('slided');
          //ur.classList.remove('slided');
        } else {
          futas[i].classList.add('slided');
          //ur.classList.add('slided');
        }
      }
    }, 0 * i);
  }
}


function futaSlide(){
  for (var i=0; i < futas.length; i++) {
    const fu = futas[i];
    fu.style.display = 'block';
    //const ur = uras[wRand[i]];
    setTimeout(() => {
      const toRight = fu.classList.contains('slided');

      //ur.animate(futaKey(!toRight, true) ,futaOpt(false, true));
      const slideIn = fu.animate(futaKeyframe(toRight, true) ,futaOption(false, true));

      slideIn.onfinish = function(){
        //var target = fu.previousElementSibling;
        //fillWaku(target);

        //ur.animate( futaKey(toRight, false), futaOpt(false, false));
        fu.animate( futaKeyframe(toRight, false), futaOption(false, false));

        if (toRight) {
          fu.classList.remove('slided');
          //ur.classList.remove('slided');
        } else {
          fu.classList.add('slided');
          //ur.classList.add('slided');
        }
      }
    }, 0 * i);
  }
}

function futaKeyframe(is_right, is_in){
  //キーフレームを格納する配列
  const key = [{transform: 'translateX(0%)'}];
  if (is_right == is_in) transition = {transform: 'translateX(100%)'};
  else transition = {transform: 'translateX(-100%)'};

  /*
  is_in(futaが入っていくか・出ていくかを表すフラグ)
  trueであればtransitionをunshift(配列の先頭に追加)、
  falseならtransitionをpush(配列の末尾に追加)することで、入るモーション・出ていくモーションのキーフレーム配列を返す
  */
  if(is_in) key.unshift(transition);
  else key.push(transition);

  return key;
}

function futaOption(is_delay, is_in){
  option = {};
  if (is_in){
    option['easing'] = 'cubic-bezier(.21,.68,.44,1)';
  } else {
    option['easing'] = 'cubic-bezier(.56,0,.79,.32)';
    option['delay'] = 100;
  }

  if (is_delay) {
    option['duration'] = 600;
    if (is_in) option['delay'] = 100;
  } else {
    option['duration'] = 700;
  }
  option['fill'] = 'forwards';
  return option;
}

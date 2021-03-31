import React from 'react'
import '../style/styleForbidden.scss';

const interval = 500;

function generateLocks() {
  const lock = document.createElement('div'),
        position = generatePosition();
  lock.innerHTML = '<div class="top"></div><div class="bottom"></div>';
  lock.style.top = position[0];
  lock.style.left = position[1];
  lock.classList = 'lock'// generated';
//   document.body
  document.getElementById("forbidden").appendChild(lock);
  setTimeout(()=>{
    lock.style.opacity = '1';
    lock.classList.add('generated');
  },100);
  setTimeout(()=>{
    lock.parentElement.removeChild(lock);
  }, 2000);
}
function generatePosition() {
  const x = Math.round((Math.random() * 100) - 10) + '%';
  const y = Math.round(Math.random() * 100) + '%';
  return [x,y];
}

function Forbidden() {
   
// setInterval(generateLocks,interval);
// generateLocks();
    return (
        <div id="forbidden">
            <div className="container">
            <h1>4<div className="lock"><div className="top"></div><div className="bottom"></div>
                </div>3</h1><p>Access denied</p>
            </div>
        </div>
    )
}

export default Forbidden

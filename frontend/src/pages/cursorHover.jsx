import React, { useEffect, useRef } from 'react';
import './cursorHover.css'; 

const CursorHoverEffect = () => {
  const cursorRef = useRef(null);
  let isInElement = false;

  useEffect(() => {
    const cursor = cursorRef.current;
    const elements = document.querySelectorAll('.cursor-hover-element');

    document.addEventListener('mousemove', handleMouseMove);

    elements.forEach((element) => {
      element.addEventListener('mouseenter', enterCursor);
      element.addEventListener('mouseleave', leaveCursor);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', enterCursor);
        element.removeEventListener('mouseleave', leaveCursor);
      });
    };
  }, []);

  const handleMouseMove = (event) => {
    const { pageX, pageY } = event;
    moveCursor(pageX, pageY);
  };

  const moveCursor = (pX, pY) => {
    const diff = 10;
    if (!isInElement) {
      cursorRef.current.style.left = `${pX - diff}px`;
      cursorRef.current.style.top = `${pY - diff}px`;
      cursorRef.current.style.width = '20px';
      cursorRef.current.style.height = '20px';
      cursorRef.current.style.borderRadius = '50%';
    }
  };

  const enterCursor = (event) => {
    isInElement = true;
    const elem = event.target;
    const { offsetLeft: eX, offsetTop: eY, offsetWidth: eW, offsetHeight: eH } = elem;
    const diff = 6;
    cursorRef.current.style.left = `${eX - diff}px`;
    cursorRef.current.style.top = `${eY - diff}px`;
    cursorRef.current.style.width = `${eW + diff * 2 - 1}px`;
    cursorRef.current.style.height = `${eH + diff * 2 - 1}px`;
    cursorRef.current.style.borderRadius = '5px';
  };

  const leaveCursor = () => {
    isInElement = false;
  };

  return (
    <>
      <div id="circle-cursor" ref={cursorRef}></div>
    </>
  );
};

export default CursorHoverEffect;

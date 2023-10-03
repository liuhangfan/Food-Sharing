import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {useOnClickOutside} from '../../hooks';

const Dropdown = props => {
  const [showMenu, setShowMenu] = useState(props.defaultShowMenu);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowMenu(props.defaultShowMenu));

  useEffect(() => {
    if (showMenu) {
      window.removeEventListener('click', hideDropdownMenu);
    } else {
      window.addEventListener('click', hideDropdownMenu);
    }
    return () => window.removeEventListener('click', hideDropdownMenu);
  });


  const hideDropdownMenu = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div class="relative cursor-pointer h-20px" ref={ref}>
      <div class="flex justify-between items-center cursor-pointer" onClick={() => toggleMenu()}>
        {props.headerObject}
        {props.headerTitle}
      </div>
      {showMenu && (
        <ul class="absolute top-full border border-gray-300 py-2" onClick={e => {hideDropdownMenu();}}>
          {props.items.map((item) => (
            <li class="" key={item.id + Math.random()}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  headerTitle: PropTypes.string,
  headerObject: PropTypes.object,
  items: PropTypes.array,
  defaultShowMenu: PropTypes.bool
};

export default Dropdown;

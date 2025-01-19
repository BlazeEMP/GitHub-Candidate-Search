import { NavLink } from 'react-router-dom';

// using NavLink instead of Link to style the active link and handle dynamic pages at outlet
const Nav = () => {
  return (
      <>
          <div className='nav-column'>
              <span>Navigation</span>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/SavedCandidates'>Potential Candidates</NavLink>
          </div>
      </>
  )
};

export default Nav;

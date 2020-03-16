import React from 'react';
import BreadCrumbs from '../UIElements/BreadCrumbs'
 function Home(props) {
    let crumbs = props.location.pathname.split("/")
  return (
    <>
    {props.location.pathname !== '/test/home'
     ?
    <BreadCrumbs crumbs={crumbs} />: null }
    <h1>Home Landing Route</h1>
     </>
  
  );
}
export default Home
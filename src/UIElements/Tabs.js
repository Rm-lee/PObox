import React from 'react';
import { Link, } from "react-router-dom"
import ProjSettings from '../Projects/ProjSettings'
import { Menu, Segment,Icon } from 'semantic-ui-react'
import { useState} from 'react'



function Tabs(props) {
    
const [activeItem, setActiveItem] = useState("Projects")

const handleActive = (e, {tag}) => {
setActiveItem(tag)
if(tag === "Settings"){
  openCloseSettings()
}

}
const [settings, setSettings] = useState(false)
const [hover,setHover] = useState(false)
const openCloseSettings = () => {
  setSettings(!settings)

}
  return (
   <>
    <Segment style={{padding:"5px",margin:"0",width:"100%", position:"fixed",zIndex:"3", borderRadius:"0",}}inverted>
        <Menu style={{margin:"0",padding:"0"}} inverted pointing secondary>
      
          <Menu.Item as={Link} to="/projects"
            name='Projects'
            active={activeItem === 'Projects'}
            onClick={handleActive}
            tag="Projects"
          />
        
          

          <Menu.Item as={Link} to="/bookmarks"
            name='Bookmarks'
            tag='Bookmarks'

            active={activeItem === 'Bookmarks'}
            onClick={handleActive}
          />
         
          <Menu.Item as={Link} to="/commands"
            name='Commands'
            tag='Commands'

            active={activeItem === 'Commands'}
            onClick={handleActive}
          />
            <Menu.Item as={Link} to="/files"
            name='Files'
            tag='Files'

            active={activeItem === 'Files'}
            onClick={handleActive}
          />
            <Menu.Item as={Link} to="/snippets"
            name='Snippets'
            tag='Snippets'

            active={activeItem === 'Snippets'}
            onClick={handleActive}
          />
            <Menu.Item as={Link} to="#"
            icon={<Icon name='setting' 
             style={{display:"flex",alignItems:"center",fontSize:"2rem",position:"absolute",top:"0",padding:"0",marginTop:"-9px",right:"-1px"}} 
            color={hover ? "teal" :"blue"} 
             />}
            tag="Settings"
            active={activeItem === 'Settings'}
            onClick={handleActive}
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
          />
        </Menu>
      </Segment>
      <ProjSettings close={openCloseSettings}  visible={settings} />
</>
  );
}
export default Tabs
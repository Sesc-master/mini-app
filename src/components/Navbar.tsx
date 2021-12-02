import React, { useState } from 'react';
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import {Icon28UserCircleOutline, Icon28NewsfeedOutline} from "@vkontakte/icons"

import '@vkontakte/vkui/dist/vkui.css';

const Navbar = () => {
  const [simple, setSimple] = useState('one')

	return (
		<FixedLayout filled vertical="bottom" >      
			<Tabbar>
				<TabbarItem style={{paddingTop: '1em', paddingBottom: '1em'}} selected={simple === 'one'} onClick={() => setSimple('one')}><Icon28NewsfeedOutline/></TabbarItem>
				<TabbarItem style={{paddingTop: '1em', paddingBottom: '1em'}} selected={simple === 'two'} onClick={() => setSimple('two')}><Icon28UserCircleOutline/></TabbarItem>
				<TabbarItem style={{paddingTop: '1em', paddingBottom: '1em'}} selected={simple === 'three'} onClick={() => setSimple('three')}><Icon28UserCircleOutline/></TabbarItem>
			</Tabbar>
		</FixedLayout>      
	);
}

export default Navbar;
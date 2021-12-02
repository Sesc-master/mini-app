import React from 'react';
import bridge, {VKBridgeEvent, AnyReceiveMethodName, UserInfo} from '@vkontakte/vk-bridge';
import { View, PanelHeader, ScreenSpinner} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import Navbar from './components/Navbar';
import Task from './components/task/task';


class App extends React.Component <{}, {activePanel: string, fetchedUser: UserInfo|null, popout: any}>{

	async fetchData() {
		const user = await bridge.send('VKWebAppGetUserInfo');
		this.setState({fetchedUser: user, popout: null});
	}

	componentDidMount() {
		bridge.subscribe((event: VKBridgeEvent<AnyReceiveMethodName>) => {
			if (event.detail.type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = event.detail.data.scheme ? event.detail.data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		this.fetchData().then(() => {
			console.log("Data is fetched!")	
		});
	}

	render() {
		return (
			<View activePanel={''}>
			<PanelHeader fixed={false} style={{fontFamily: 'sans-serif'}}>SESC Master</PanelHeader> 
			<Task date={Number} topic={String} homework={String} mark={Number}/>
			<Navbar/>
			</View>
		);
	}

	constructor(props:any){
		super(props);
		this.state = {
			activePanel: '',
			fetchedUser: null,
			popout: <ScreenSpinner/>
		}
	}
}

export default App;
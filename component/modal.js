import React, { Component } from "react";
import { 
    Dimensions,
    Modal,
    Share
} from "react-native";

import {WebView} from "react-native-webview"
 
import {Container, Header, Content, Body, Left, Icon, Right, Title, Button} from 'native-base';

const WebViewHeight = Dimensions.get('window').height - 56;

class ModalComponent extends Component {


    constructor(props){
        super (props)
    }

    handleClose = () => {
        return this.props.onClose();
    }

    handleShare = () => {
        const {url, title} = this.props.articleData;
        message = `${title}\n\nRead More ${url}\n\n Shared via News`;
        return Share.share(
            {title, message, url: message},
            {dialogTitle:`Share ${title}`}
        )
    }

    render() {
        const { showModal, articleData } = this.props;
        const{ url } = articleData;
        if(url != undefined ) {
        return (
            <Modal
                animationType="slide"
                transparentvisible={showModal}
                onRequestClose={this.handleClose}
            >
                <Container style={{margin:15, marginBottom:0, backgroundColor:'white'}}>
                    <Header>
                        <Left>
                            <Button onPress={this.handleClose} transparent>
                                <Icon name="close" style={{color:'white', fontSize: 12}} />
                            </Button>
                        </Left>
                        <Body>
                            <Title children={articleData.title} style={{color:'white'}} />
                        </Body>
                        <Right>
                            <Button onPress={this.handleShare} transparent>
                                <Icon name="share" style={{color:'white', fontSize: 12}} />
                            </Button>
                        </Right>
                    </Header>
                    <Content contentContainerStyle={{flex:1}}>
                        <WebView source={{uri:url}} style={{flex: 1}}
                        onError={this.handleClose} startInLoadingState
                        scalesPageToFit/>   
                    </Content>
                </Container>
            </Modal>
        );
      } else {
          return null;
      }
    }
}
export default ModalComponent;


import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import Gallery from '../component/Gallery'
import Fire from '../Fire1'

class GalleryScreen extends Component {

    state = {
        images: []
      }

      fetchPosts = async () => {
        try {
          const posts = await Fire.shared.getUserPosts()
          let images = posts.map(item => {
            return item.image
          })
      
          this.setState({ images })
          console.log(this.state.images)
        } catch (error) {
          console.log(error)
        }
      }

      componentDidMount() {
        this.fetchPosts()
        }

    render() {
        const { images } = this.state
        return (
            <View style={styles.container}>
                <View>
                <Gallery items={images}/>
                </View>
            </View>
        );
    }
}
export default GalleryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
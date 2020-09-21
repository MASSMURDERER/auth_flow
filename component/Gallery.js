import React, { Component } from 'react'
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import Fire from '../Fire1'

class Gallery extends Component {
    constructor(props) {
      super(props)
      const itemSize = (Dimensions.get('window').width - 12) / 3
      this.state = {
        itemSize,
        total: this.props.items.length,
        images:[]
      }
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


 extractItemKey = index => `${index}`

 renderItem = ({ item, index }) => (
 <React.Fragment>
   <TouchableOpacity onPress={() => alert('On progress')}>
 <Image style={{
        width: this.state.itemSize,
        height: this.state.itemSize,
        margin: 1.5
 }}
 source={{uri:item}}
 />
 </TouchableOpacity>
 </React.Fragment>
 )

 render() {
 return (
 <View style={styles.images}>
 <FlatList
 data={this.state.images}
 numColumns={3}
 keyExtractor={this.extractItemKey}
 renderItem={this.renderItem}
 />
 </View>
 )
 }
}

const styles = StyleSheet.create({
    images: {
      flexDirection: 'row',
      paddingHorizontal: 0.5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'black'
    }
  })
  
  export default Gallery
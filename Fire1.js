import * as firebase from 'firebase'


class Fire {

    getUserPosts = () => {
        let user = firebase.auth().currentUser
        return firebase
          .firestore()
          .collection('posts')
          .where('uid', '==', user.uid)
          .get()
          .then(function(querySnapshot) {
            let posts = querySnapshot.docs.map(doc => doc.data())
            return posts
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error)
          })
      }

      getUserDetails = () => {
        let user = firebase.auth().currentUser
        return firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(function(doc) {
            let userDetails = doc.data()
            return userDetails
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error)
          })
      }

      uploadAvatar = avatarImage => {
        let user = firebase.auth().currentUser
      
        return firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            avatar: avatarImage
          })
      }


    
    addPost = async ({text, localUri, name, avatar}) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)

        

        return new Promise((res,rej) => {
            this.firestore.collection("posts").add({
                text,
                name,
                avatar,
                uid: this.uid,
                timestamp:this.timestamp,
                image: remoteUri,
                likes: []
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error);
            })
        })
    }

    uploadPhotoAsync = async (uri, filename) => {

        return new Promise(async (res,rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err)
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                res(url)
            }
            )
        })
    }


    createUser = async user => {
        let remoteUri = null


        if(user.name.length < 4) {
            alert("Please enter atleast 4 characters")
            return;
          }

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: null
            })
            

            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({avatar: remoteUri}, {merge: true})
            }
        } catch(error) {
            alert(error);
        }
    }

    updateProfile = async user => {
        let remoteUri = null;
        
        try {
            let db = this.firestore.collection("users").doc(this.uid);
           
        
            db.update({
              avatar: user.avatar
            });
        
            if (user.avatar) {
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);
        
                db.set({ avatar: remoteUri }, { merge: true });
            }
        } catch (error) {
            alert("Error: ", error);
        }  
        
        }


    signOut = () => {
        firebase.auth().signOut()
    }

    get firestore(){
        return firebase.firestore()
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire
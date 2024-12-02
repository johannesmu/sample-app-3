import { Text, View, StyleSheet,  Pressable, TextInput, Switch } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc } from '@firebase/firestore'
import { ItemPrototype } from '@/interfaces/ItemInterface'

export default function DetailScreen(props: any) {
    const [documentData, setDocumentData] = useState<ItemPrototype | any>()
    const [ docName, setDocName ] = useState<string>('')
    const [ docStatus, setDocStatus ] = useState<boolean>( false )
    const [ edited, setEdited ] = useState<boolean>( false )
    const [ loaded, setLoaded ] = useState<boolean> ( false )

    //let dataLoaded = false
   

    // access navigation object via hook
    const navigation = useNavigation()
    // set screen options
    useEffect( () => {
        navigation.setOptions({ headerShown: true })
    }, [navigation])

   

    const { id }: any = useLocalSearchParams()
    const { name } = useLocalSearchParams()


    const db = useContext(FirestoreContext)
    const auth = useContext(AuthenticationContext)

    const getDocument = async () => {
        console.log( auth )
        const ref = doc(db, `users/${auth.currentUser.uid}/documents`, id)
        const document = await getDoc(ref)
        let data: ItemPrototype | any = document.data()
        data.id = id
        setDocumentData(data)
        setDocName( data.name )
        setDocStatus( data.status )
        setEdited( false )
        console.log( document )
    }

    useEffect( () => { 
        //if( !loaded && auth ) {
            getDocument()
        //}      
    }, [id ])

    

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         if(dataLoaded == false ) {
    //             getDocument()
    //         }
    //     }
    // })

    if (!documentData) {
        return null
    }
    else {
        return (
            <View style={styles.page}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderText}>Detail for  {name}</Text>
                </View>
                <View style={styles.container}>
                    <Text>Document name</Text>
                    <TextInput 
                        value={ docName} 
                        onChangeText={
                            (val) => {
                                setDocName(val)
                                setEdited( true )
                            }
                        }
                    />
                    <Text>Document status</Text>
                    <Switch 
                        value={docStatus} 
                        onValueChange={
                            () =>{ 
                                (docStatus) ? setDocStatus(false) : setDocStatus(true) 
                                setEdited( true )
                            }
                        }
                    />
                    <Pressable style={ (edited) ? styles.editButton : styles.editButtonDisabled }>
                        <Text style={ styles.editButtonText}>Save Changes?</Text>
                    </Pressable>
                </View>

                <Link href="/(tabs)/list" style={ styles.backButton }>
                    <Text>Go back</Text>
                </Link>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    itemHeader: {
        backgroundColor: "#f1f7b7",
        padding: 10,
    },
    itemHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        padding: 12,
    },
    editButton: {
        padding: 10,
        backgroundColor: "darkblue",
        marginVertical: 20,
    },
    editButtonText: {
        color: "white",
        textAlign: "center"
    },
    editButtonDisabled: {
        display: "none"
    }
})
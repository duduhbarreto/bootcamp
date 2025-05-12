
import { TouchableOpacity, View, Image, Dimensions } from 'react-native';
import DatePicker from '../../components/DatePicker/DatePicker';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Map from '../../components/Map/Map';



const defaultImage = require('../../assets/images/profile-edit.png');

export default function FormElements() {

    const [image, setImage] = useState<string>('../../assets/images/profile-edit.png');

    async function pickImage() {
        const options: ImageLibraryOptions = {
            mediaType: 'photo'
        }
        const response = await launchImageLibrary(options);
        if(response.assets){
            setImage(response.assets[0].uri!);
        }
    }


    return (
        <View style={{ alignItems: 'center', flex: 1, paddingTop: 50 }}>
            <View style={{ width: '100%', height: 150, paddingLeft: 10 }}>
                <DatePicker
                    label='Data do encontro'
                    onChange={(date) => console.log(date.toISOString())}
                />
            </View>

            <View>
                <TouchableOpacity
                    onPress={pickImage}
                >
                    <Image
                        resizeMethod='resize'
                        resizeMode='cover'
                        source={(image && image !== '../../assets/images/profile-edit.png') ? { uri: image } : defaultImage}
                        style={{
                            width: Dimensions.get('window').width * 0.9,
                            height: 200,
                            borderRadius: 10,
                        }}
                    />
                </TouchableOpacity>
            </View>

            <Map 
                onLocationChange={(latitude, longitude) => console.log(latitude, longitude)}
            />
        </View>
    );
}
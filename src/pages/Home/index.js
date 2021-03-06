import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity as Button } from 'react-native';

import {
    GraphRequest,
    GraphRequestManager
} from 'react-native-fbsdk';

import {
    Container,
    CardWelcome,
    ContainerImage,
    BannerTime,
    TextTime,
    Time,
    Days,
    ContentMarried,
    TitleMarried,
    Description,
    ReadMore,
    ReadText,
    CardFeed,
    ContentFeed,
    TitleFeed,
    DescriptionFeed,
    TextMore,
    HorizontalMenu,
    CardPresence,
    TitleIcon
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import IconAccount from '~/assets/svgs/IconAccount.svg';

import Icon from 'react-native-vector-icons/Feather';

function Home(props) {
    const dispatch = useDispatch();
    const married = useSelector(state => state.married);

    useEffect(() => {
        hasToken();
    }, [])


    calculateIntervalDate = () => {
        const daysAtMarried = new Date(married.dataMarried.date);
        const today = new Date();
        const intervalTime = Math.abs(daysAtMarried.getTime() - today.getTime());
        const diffDays = Math.ceil(intervalTime / (1000 * 3600 * 24));

        return diffDays;
    }

    hasToken = async () => {
        const userAsync = await AsyncStorage.getItem('@userLogged');
        const user = JSON.parse(userAsync);
        const tokenFacebook = await AsyncStorage.getItem('@tokenFacebook');
        const token = await AsyncStorage.getItem('@token');
        
        if (user && token && !tokenFacebook) {
          
            dispatch({
                type: 'LOGGED_USER',
                payload: { ...user, token, image: user.image_url }
            })
            props.navigation.setParams({ user });

            // Se você tiver o token e o tokenfacebook ele loga com o facebook
        } else if (tokenFacebook && token) {
            logged_facebook(tokenFacebook)
        }
        else {
            return false;
        }
    }

    logged_facebook = (token) => {
        const infoRequest = new GraphRequest('/me', {
            accessToken: token,
            parameters: {
                fields: {
                    string: 'id, email, picture.type(large),gender,name'
                }
            }
        }, loginCallback)
        new GraphRequestManager().addRequest(infoRequest).start();
    }

    loginCallback = async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            const tokenFacebook = await AsyncStorage.getItem('@tokenFacebook');
            const userAsync = await AsyncStorage.getItem('@userLogged');
            const userToken = JSON.parse(userAsync);
            const token = await AsyncStorage.getItem('@token');
            

            let user = {};
            user.id = userToken.id;
            user.idFacebook = result.id;
            user.Nome = result.name === userToken.Nome ? result.name : userToken.Nome;
            user.Email = result.email === userToken.Email ? result.email : userToken.Email;
            user.image = result.picture.data.url;
            user.genre = 'Masculino';
            user.type = 'Facebook';

            dispatch({
                type: 'LOGGED_USER',
                payload: { ...userToken, ...user, tokenFacebook, token }
            })
            props.navigation.setParams({ user });

        }
    }

    return (
        <Container>
            <CardWelcome>
                <ContainerImage source={{ uri: married.dataMarried.banner_url }}>
                    <TitleMarried>{married.dataMarried.title}</TitleMarried>
                </ContainerImage>
                <BannerTime>
                    <TextTime>FALTAM</TextTime>
                    <Time>{calculateIntervalDate()}</Time>
                    <Days>DIAS</Days>
                </BannerTime>


            </CardWelcome>

            <CardFeed>
                <Icon name="cast" size={32} color="#fff" />
                <ContentFeed>
                    <TitleFeed>Mural TiCasei</TitleFeed>
                    <DescriptionFeed>Pegue seus celulares, é hora de compartilhar suas fotos em tempo real para que todas possam ver :)</DescriptionFeed>
                </ContentFeed>
            </CardFeed>

            <TextMore>Veja Mais</TextMore>

            <HorizontalMenu
                horizontal={true}
                showsHorizontalScrollIndicator={false}>

                <Button onPress={() => props.navigation.navigate('RSVP')}>
                    <CardPresence>

                        <IconAccount width={50} height={50} />
                        <TitleIcon>Marcar Presença</TitleIcon>
                    </CardPresence>
                </Button>

                <Button onPress={() => props.navigation.navigate('Presentes')}>
                    <CardPresence>
                        <IconAccount width={50} height={50} />
                        <TitleIcon>Lista Presentes</TitleIcon>
                    </CardPresence>
                </Button>

                <Button onPress={() => props.navigation.navigate('Galeria')}>
                    <CardPresence>
                        <IconAccount width={50} height={50} />
                        <TitleIcon>Galeria</TitleIcon>
                    </CardPresence>
                </Button>

                <Button onPress={() => props.navigation.navigate('Mensagens')}>
                    <CardPresence>
                        <IconAccount width={50} height={50} />
                        <TitleIcon>Mensagens</TitleIcon>
                    </CardPresence>
                </Button>
            </HorizontalMenu>
        </Container>
    );
}

Home.navigationOptions = () => {
    return {
        drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor} size={18} />,
        iconContainerStyle: {
            opacity: 1
        }
    }
}


export default Home;

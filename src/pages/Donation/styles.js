import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    padding:20px;
    justify-content:flex-end;
`;

export const ContainerScrollView = styled.ScrollView``;

export const ContainerCard = styled.View``;


export const ButtonSubmit = styled.TouchableOpacity`
    background:${props => props.disabled ? '#ddd' : '#672F9E'};
    padding:20px;
    margin:10px 0px;
    align-self:stretch;
    border-radius:100px;
`;

export const TextButton = styled.Text`
    color:#fff;
    text-align:center;
`;

export const FormCard = styled.View`
   margin-top:20px;
`;

export const FormGroup = styled.View``;




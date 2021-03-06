import styled from 'styled-components/native';

export const ContainerScroll = styled.ScrollView``;

export const Container = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
    padding:20px;
`;

export const Form = styled.View`
    align-self:stretch;
`;

export const TitleForm = styled.Text`
    align-self:center;
    margin:20px 0px;
    font-size:18px;
    color:#979797;
`;

export const InputForms = styled.TextInput`
    background:#E8E8E8;
    padding:20px;
    margin:10px 0px;
    border-radius:100px;
    text-align:center;
`;

export const FormGroup = styled.View.attrs({
})`
    background:#E8E8E8;
    border-radius:100px;
    margin:10px 0px;
    justify-content:center;
`

export const Select = styled.Picker`
    color:#979797;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    background:#672F9E;
    padding:20px;
    margin:10px 0px;
    border-radius:100px;
`;

export const TextButton = styled.Text`
    color:#fff;
    text-align:center;
`;

export const SmallRules = styled.Text`
    font-size:9px;
    color:#979797;
    text-align:center;
`;

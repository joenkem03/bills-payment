import  styled from 'styled-components';

export const UserContainerBg = styled.div`
    background: url('/img/balloon-lg.jpg') no-repeat 50% fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
`
export const UserBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
`
export const UserBox = styled.div`
    width: 40%;
    min-height: 70vh;
    background: #fff;
    border-radius: 10px;
    padding: 50px 100px;
    display: flex;
    flex-flow: column wrap;
`

import  styled from 'styled-components';

export const FixedBg = styled.div`
    background: url('img/balloon-lg.jpg') no-repeat 50% fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`
export const LoginContainer = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100vh;
    .login,
    .image{
        min-height: 100vh;
    }
    .bg-image{
        background-image: url('/img/balloon-lg.jpg');
        background-size: cover;
        background-position: center center;
    }
`
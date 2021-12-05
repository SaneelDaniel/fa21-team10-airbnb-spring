import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';

const S = {
  DivSplashRoot: styled.div`
    position: relative;
  `,

  DivSplashContainer: styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    @media (min-width: 744px) {
      height: 100vh;
      min-height: 680px;
    }
  `,

  DivSplashGray: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #d8d8d8;
    z-index: -2;
  `,
  SplashImage: styled.div`
    z-index: -1;
    height: auto;
    width: auto;
    min-height: 100%;
    min-width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    transition: opacity 0.5s ease 0s;
    background-position: center;
    background-repeat: unset;
    background-size: cover;
    background-image: url('https://a0.muscache.com/4ea/air/r:w775-h518-sfit,e:fjpg-c80/pictures/0ffd8594-f123-43f0-85bb-7ef88c6f0624.jpg');

    @media (min-width: 744px) {
      background-image: url('https://a0.muscache.com/4ea/air/r:w1550-h1037-sfit,e:fjpg-c80/pictures/0ffd8594-f123-43f0-85bb-7ef88c6f0624.jpg');
    }
  `,
};

class Home extends Component {
  render() {
    return (
      <>
        <S.DivSplashRoot>
          <S.DivSplashContainer>
            <S.DivSplashGray>
              <S.SplashImage />
            </S.DivSplashGray>
            <SearchForm />
            {/* <FooterContainter /> */}
          </S.DivSplashContainer>
        </S.DivSplashRoot>
        {/* <FeaturedContainer /> */}
      </>
    );
  }
}

export default Home;

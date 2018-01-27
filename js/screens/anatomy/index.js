import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles';

class Anatomy extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return null;
    } else {
      console.log(data);
    }

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          {/* {data.bots.map(bot => <Text>{bot.name}</Text>)} */}
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const BotsQuery = gql`
  query($skip: Int, $limit: Int) {
    bots(skip: $skip, limit: $limit) {
      id
      name
      description
      image {
        id
        path
        name
      }
      rating
    }
  }
`;

export default graphql(BotsQuery, {
  options: () => ({
    variables: { skip: 0, limit: 12 }
  })
})(Anatomy);

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
import { graphql, compose } from 'react-apollo';

import styles from './styles';
import { BotsQuery } from '../../graphql/queries';

class Anatomy extends Component {
  render() {
    const { botsQuery } = this.props;
    if (botsQuery.loading) {
      return null;
    } else {
      console.log(botsQuery);
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
          {/* {botsQuery.bots.map(bot => <Text>{bot.name}</Text>)} */}
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

export default compose(
  graphql(BotsQuery, {
    name: 'botsQuery',
    fetchPolicy: 'network-only',
    options: () => ({
      variables: { skip: 0, limit: 12 }
    })
  })
)(Anatomy);

import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import Dictionary from './Dictionary';

class Challenge extends Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      currentChallenge: 0
    }
  }

  componentWillMount() {
    this.setState( { challenges: [ this.createNewChallenge() ] } );
  }

  getNextChallenge = () => {
    if ( this.state.currentChallenge === this.state.challenges.length - 1 ) {
      let challenges = this.state.challenges;
      challenges.push( this.createNewChallenge() );

      this.setState( {
        challenges: challenges,
        currentChallenge: this.state.currentChallenge + 1
      } );
    } else {
      this.setState( {
        currentChallenge: this.state.currentChallenge + 1
      } );
    }
  }

  setPreviousChallenge = () => {
    if ( this.state.currentChallenge > 0 ) {
      this.setState( {currentChallenge: this.state.currentChallenge - 1} );
    }
  }

  createNewChallenge = () => {
    let id = this.state.challenges ? this.state.challenges.length : 0,
        adjective = this.getRandomWord(Dictionary.adjectives),
        lens = this.getRandomWord(Dictionary.lenses),
        photo = this.getRandomWord(Dictionary.photo),
        target = this.getRandomWord(Dictionary.targets),
        action = Math.random() < 0.5 ? this.getRandomWord(Dictionary.actions) : ''

    return {
      id: id,
      value: `A ${adjective} ${lens} ${photo} of ${target} ${action}`
    };
  }

  getRandomWord = list => {
    let index = Math.floor(Math.random() * list.length);
    return list[index];
  }

  render() {
    return (
  			<Swipeable className="Challenge"
          onSwipedRight={ this.setPreviousChallenge }
          onSwipedLeft={ this.getNextChallenge }>
            <p className="Challenge__paragraph">
              <span className="Challenge__text">{ this.state.challenges[this.state.currentChallenge].value }</span>
            </p>
            <p className="Challenge__paging">
              {this.state.currentChallenge + 1} / {this.state.challenges.length}
            </p>
  			</Swipeable>
    );
  }
}

export default Challenge;

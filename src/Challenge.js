import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import Dictionary from './Dictionary';
var _ = require('lodash');

// TODO use scss colors
const colors = [
  '45CCFF',
  '49E83E',
  'FFD432',
  'E84B30',
  'B243FF'
];

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
        adjective = _.sample(Dictionary.adjectives),
        lens = Math.random() < 0.2 ? _.sample(Dictionary.lenses) : '',
        photo = _.sample(Dictionary.photo),
        target = _.sample(Dictionary.targets),
        action = Math.random() < 0.35 ? _.sample(Dictionary.actions) : '',
        color = '#' + _.sample(colors);

    return {
      id: id,
      value: `A ${adjective} ${lens} ${photo} of ${target} ${action}`,
      color: color
    }
  }

  render() {
    return (
			<Swipeable className="Challenge"
        style={{backgroundColor : this.state.challenges[this.state.currentChallenge].color}}
        onSwipedRight={ this.setPreviousChallenge }
        onSwipedLeft={ this.getNextChallenge }>
        { this.state.challenges.map( challenge => (
          <p key={challenge.id} className={'Challenge__txt ' + ( challenge.id < this.state.currentChallenge ? 'Challenge__txt--left' : challenge.id > this.state.currentChallenge ? 'Challenge__txt--right' : '')}>
            <span className="Challenge__text">{ challenge.value }</span>
          </p>
        ))}
        <p className="Challenge__paging">
          {this.state.currentChallenge + 1} / {this.state.challenges.length}
        </p>
			</Swipeable>
    );
  }
}

export default Challenge;

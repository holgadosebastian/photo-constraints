import React, { Component } from 'react';
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
    let challenges = this.state.challenges;
    challenges.push( this.createNewChallenge() );

    this.setState( {
      challenges: challenges,
      currentChallenge: this.state.currentChallenge + 1
    } );
  }

  createNewChallenge = () => {
    let id = this.state.challenges ? this.state.challenges.length : 0,
        adjective = this.getRandomWord(Dictionary.adjectives),
        lens = this.getRandomWord(Dictionary.lenses),
        photo = this.getRandomWord(Dictionary.photo),
        target = this.getRandomWord(Dictionary.target)

    return {
      id: id,
      value: `A ${adjective} ${lens} ${photo} of ${target}`
    };
  }

  getRandomWord = list => {
    let index = Math.floor(Math.random() * list.length);
    return list[index];
  }

  render() {
    return (
			<div className="Challenge"
        onClick={ this.getNextChallenge }>
        <p className="Challenge__paragraph">
          <span className="Challenge__text">{ this.state.challenges[this.state.currentChallenge].value }</span>
        </p>
			</div>
    );
  }
}

export default Challenge;

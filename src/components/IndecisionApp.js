import React from 'react'

import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import Action from './Action'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {

//#region 

state = {
  options: this.props.options,
  selectedOption: undefined
}

//#endregion

  /* region lyfecycle methods */
  componentDidMount () {
    console.log('component did mount')
    try {
      const json = localStorage.getItem('options')
      const options = JSON.parse(json)

      if (options) {
        this.setState(() => ({
          options: options
        }))
      }
    } catch (e) {
      // error handling
    }
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('component was updated')
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    }
  }

  componentWillUnmount () {
    console.log('component will unmount')
    // is fired when the page will be switched by another page in the same app
  }

  /* #endregion lyfecycle methods */

  /* #region Methods */
  /* Option component methods */
  handleDeleteOptions = () => {
    // this.setState(() => {
    //   return {
    //     options: []
    //   }
    // })

    // essa linha executa a mesma funcao de cima
    this.setState(() => ({ options: [] }))
  }

  // deletes only one item
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option
      })
    }))
  }

  /* Action component methods */
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomNum]
    this.setState (() => ({
      selectedOption: option
    }))
  }

  handleClearSelectedOption = () => {
    this.setState (() => ({
      selectedOption: undefined
    }))
  }

  /* Add option component methods */
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter a valid value to add an option'
    } else if (this.state.options.indexOf(option) > -1) {
      return ('This option already exists')
    } else {
      // this.setState((prevState) => {
      //   return {
      //     options: prevState.options.concat([option])
      //   }
      // })

      this.setState((prevState) => ({ options: prevState.options.concat([option]) }))
    }
  }

  /* #endregion */

  render () {
    const subtitle = 'Put your life in the hands of a computer'

    return (
      <div>
        <Header subtitle={subtitle}/>
        
        <div className = 'container'>
          <Action
          hasOptions = {this.state.options.length > 0}
          options = {this.state.options}
          handlePick = {this.handlePick}
          />
          
          <div className = 'widget'>
          <Options
          options={this.state.options}
          handleDeleteOptions = {this.handleDeleteOptions}
          handleDeleteOption = {this.handleDeleteOption}
          />
          </div>
          
          <AddOption
          handleAddOption = {this.handleAddOption}
          />      
        </div> 
          
          <OptionModal
          selectedOption = {this.state.selectedOption}
          clearSelectedOption = {this.handleClearSelectedOption}
        />
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: []
}


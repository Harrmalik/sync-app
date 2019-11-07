import React, { Component } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfImages: 0,
      images: [],
      lastFive: [],
      newImage: ''
    }

    setInterval(() => {
      $.get({
        url: 'http://localhost:3001/getImages',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).always( data => {

        this.setState({
          numOfImages: data.url.length,
          images: data.url,
          lastFive: data.url.slice(Math.max(data.url.length - 5, 1)),
          newImage: this.state.numOfImages < data.url.length ? data.url[data.url.length -1] : this.state.newImage
        })
      })
      const data = {
        url: [
          '', '' ,''
        ]
      },
      images = data.url;


    }, 5000);
  }

  getImageName(image) {
    return image.split('/')[image.split('/').length -1]
  }

  sharePhoto(image) {
    Swal.fire({
      title: 'Where would you like to share',
      html: `
        <div class="ui form">
          <div class="inline field">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label>Facebook</label>
            </div>
          </div>

          <div class="inline field">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label>Instagram</label>
            </div>
          </div>

          <div class="inline field">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label>Youtube</label>
            </div>
          </div>

          <div class="inline field">
            <div class="ui checkbox">
              <input type="checkbox" tabindex="0" class="hidden">
              <label>Snapcht</label>
            </div>
          </div>

          <div class="field">
            <label>Post Message</label>
            <textarea rows="2"></textarea>
          </div>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Success!',
          'Image has been shared.',
          'success'
        )
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="ui header">You have {this.state.numOfImages} images</div>

        <div className="ui header">Last Image</div>
        {
          this.state.newImage ?
          <div className="ui card">
            <div className="image">
              <img src={this.state.newImage} />
            </div>
            <div className="content">
              <div className="header">{this.getImageName(this.state.newImage)}</div>
            </div>
            <div className="extra content">
              <span className="right floated">
                <div className="ui blue button" onClick={() => { this.sharePhoto(this.state.newImage) }}>Share</div>
              </span>
              <span>
                <div className="ui black button">Upload</div>
              </span>
            </div>
          </div> : <div>No new images</div>
        }


        <div className="ui header">All images</div>
        <div class="ui relaxed divided list">
          { this.state.images.map(image => {
            return (
              <div class="item">
                <i class="large github middle aligned icon"></i>
                <div class="content">
                  <a class="header">{this.getImageName(image)}</a>
                  <div class="description"><a target="_blank" href={image}>View</a></div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    );
  }
}


export default App;

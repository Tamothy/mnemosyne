// Spotify Web API search component
var MusicSearch = React.createClass({
    getInitialState: function() {
        return { tracks: [] };
    },
    searchSpotify: function (result) {
        if (result !== ""){
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                dataType: 'json',
                data: {
                    q: result,
                    type: 'track',
                    limit: 12,
                    market: 'US'
              },
              success: function (response) {
                this.setState({tracks: response.tracks.items});
              }.bind(this),
              error: function(xhr, status, error) {
                console.error('https://api.spotify.com/v1/search', status, error.toString());
              }.bind(this)
            });
        } else {
            this.setState({ tracks: []});
        }
      },
      render: function() {
        return (
            <div className="musicSearch">
                <Musicsearch placeholder={"Search..."} icon={"search"} searchFn={this.searchSpotify} />
                <div>
                    <TrackList tracks={this.state.tracks} />
                </div>
            </div>
        );
      }
});

// Musicsearch search bar component
//  searchFn: process text input
//  result: string being seached

var Musicsearch = React.createClass({
    inputText: function() {
        // get text input
        var result = this.refs.searchInput.getDOMNode().value;
        // send result to parent component to complete the result
        this.props.searchFn(result);
    },
    render: function() {
        return (
            <div className="ui search">
                <div className="ui huge fluid icon input">
                    <input type="text" ref="searchInput" value={this.props.result} onChange={this.inputText} placeholder={this.props.placeholder} />
                    <i className={this.props.icon + " icon"}></i>
                </div>
            </div>
        );
    }
});

// Searches music tracks and artists component
var MusicTrack = React.createClass({
    render: function() {
        var imgAlbum = "";
        if (this.props.track.album.images.length >= 1) {
            imgAlbum = this.props.track.album.images[1].url;
        }

        var artistInformation = this.props.track.artists.map(function(artist) {
            return (
                <a key={artist.id}>{artist.name}</a>
            );
        });
        return (
            <div className="ui card information" onClick={this.props.playHandler}>
                <div className="ui image">
                    <img src={imgAlbum} />
                </div>
                <div className="content">
                    <div className="content">
                        <div className="header">{this.props.track.name}</div>
                        <div className="meta">{artistInformation}</div>
                    </div>
                </div>
            </div>

        );
    }
});

// Array of music track objects component
var TrackList = React.createClass({
    getInitialState: function() {
        return {audio : null};
    },
    handleClick: function(i) {
        // New audio object
        if (this.state.audio === null) {
            var audio = new Audio(this.props.tracks[i].preview_url)
            this.setState({audio : audio}, function() {
                audio.load();
                audio.play();
            });
        } else if (this.props.tracks[i].preview_url === this.state.audio.src) {
            // Play and pause
            if (this.state.audio.paused) {
                this.state.audio.play();
            } else {
                this.state.audio.pause();
            }
        } else {
            // Play new song selected
            this.state.audio.src = this.props.tracks[i].preview_url;
            this.state.audio.load();
            this.state.audio.play();
        }
    },
    render: function () {
        var trackNodes = this.props.tracks.map(function (track, i) {
            return (
                <MusicTrack playHandler={this.handleClick.bind(this, i)} key={i} track={track} />
            );
        }, this);
        return (
            <div className="ui three doubling cards">
                {trackNodes}
            </div>
        );
    }
});


React.render(
      <MusicSearch />,
      document.getElementById('content')
);

// Musicsearch:
//  searchFn: process text input
//  result: string being seached

var Musicsearch = React.createClass({
    inputText: function() {
        // get text input
        var result = this.refs.searchInput.getDOMNode().value;
        // send result to parent component
        this.props.searchFn(result);
    },
    render: function() {
        return (
            <div className="searchbar">
                <div className="search">
                    <input type="text" ref="searchInput" value={this.props.result} onChange={this.inputText} placeholder={this.props.placeholder} />
                    <i className={this.props.icon + " icon"}></i>
                </div>
            </div>
        );
    }
});

/* Render the search component */
React.render(
      <Musicsearch />,
      document.getElementById('content')
);

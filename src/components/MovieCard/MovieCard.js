import React from "react";
import { Component } from "react";
import axios from 'axios';


class MovieCard extends Component {
    state = {
        movieData: {}
    };
    
    ApiKey = "55e809a1";

    componentDidMount(){
        axios.get(`http://www.omdbapi.com/?apikey=${this.ApiKey}&i=${this.props.movieID}&plot=full`)
        .then(res => res.data)
        .then(res => {
            this.setState({
                movieData: res
            })
        })
    }

    render() {
        const {
            Title,
            Released,
            Genre,
            Plot,
            Poster,
            imdbRating
        } = this.state.movieData;

        return (
            <div className="movie-card-container">
                <div className="image-container">
                    <div className="bg-image" style={{ backgroundImage: `url(${Poster})`}}>
                    </div>
                </div>
                <div className="movie-info">
                    <h2>Movie Details</h2>
                    <div>
                        <h1>{Title}</h1>
                        <small>Released Date: { Released}</small>
                    </div>
                    <h4>Rating: {imdbRating}</h4>
                    <p>{Plot}</p>
                    <div className="tags-container">
                        {Genre && Genre.split(', ').map(g => (
                            <span key={g}>{ g }</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;
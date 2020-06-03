import React from "react";
import { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from 'axios';


class MovieList extends Component {
    state = {
        moviesList: ['tt3896198'],
        searchTerm: ''
    }
    ApiKey = "55e809a1";

    search = event => {
        event.preventDefault();
        this.setState({
            moviesList: []
        });
        axios
            .get(
                `https://www.omdbapi.com/?apikey=${this.ApiKey}&s=${
                    this.state.searchTerm
                }&plot=full`
            )
            .then(res => res.data)
            .then(res => {
                if (!res.Search) {
                    this.setState({ moviesList: [] });
                    return;
                }

                const moviesList = res.Search.map(movie => movie.imdbID);
                this.setState({
                    moviesList
                });
            });
    };

    handleChange = event => {
        this.setState({
            searchTerm: event.target.value
        });
    };

    render() {
        const { moviesList } = this.state;
        return (
            <div>
                <form onSubmit={this.search}>
                    <input placeholder="Search for a movie" onChange={this.handleChange}></input>
                    <button type="submit">Buscar</button>
                </form>
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movieID={movie} key={movie} />
                    ))
                ) : (
                    <p>
                        Couldn't find any movie. Please search again using
                        another search criteria.
                    </p>
                )}

                
            </div>
        );
    }
}

export default MovieList;
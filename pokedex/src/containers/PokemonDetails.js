import { makeStyles, Box, Typography, Grid, Button, CircularProgress } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { POKEMON_API_URL } from '../config'
import FavoriteIcon from "@material-ui/icons/Favorite";
import { toggleFavourite, TOGGLE_FAVOURITE } from '../redux/actions';
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
      height: "100vh",
      backgroundColor: "black",
      color: "white",
      marginTop: 75,
      textAlign: "center",
      borderRadius: 5,
      paddingTop: 30,
    },
    textTitle: {
      textTransform: "upperCase",
      fontFamily: "Fantasy",
    },
    pokemonImage: {
      width: "170px",
      height: "170px",
    },
    pokemonInfoContainer: {
      bottom: 60,
      position: "absolute",
      width: "100%",
    },
    seperator: {
      height: "0.01mm",
      width: "95%",
    },
    favourite: {
      height: 50,
      width: 50,
      marginTop: 15,
    },
    text: {
      fontSize: 30,
    },
  }));

function PokemonDetails() {
    const classes = useStyles();
    const [pokemon, setPokemon] = useState(null)
    const params = useParams()
    useEffect(() => {
        axios.get(`${POKEMON_API_URL}/${params.id}`).then((response) => {
            console.log(response.data)
            setPokemon(response.data)
            
        })
    }, [])

    function favouriteChecker(pokemon) {
        let found = false
        params.favourites?.map((p) => {
          if(p.id === pokemon.id) {
            found = true
          }
        })
        return found
      }
    
    if (pokemon) {
      const { name, sprites, height, weight, types } = pokemon;
      return (
        <Box>
          <Box className={classes.pokedexContainer}>
            <Typography className={classes.textTitle} variant="h1">
              {name}
            </Typography>
            <img className={classes.pokemonImage} src={sprites.front_default} />
            <Box className={classes.pokemonInfoContainer}>
              <hr className={classes.seperator} />
              <Grid container>
                <Grid item md={1}>
                     <Button
                        className={classes.favourite}
                        onClick={() => toggleFavourite(pokemon)}
                    >
                        <FavoriteIcon style={{ color: favouriteChecker(pokemon) ? "red" : "white", fontSize: 50 }} />
                    </Button>
                    </Grid>
                <Grid item md={2}>
                  <Typography className={classes.text}>
                    Name
                    <br />
                    {name}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.text}>
                    Height 
                    <br />
                    {height}m
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography className={classes.text}>
                    Weight
                    <br />
                    {weight}kg
                  </Typography>
                </Grid>
                {types.map((pokemonType) => {
                  const { name } = pokemonType.type;
                  return (
                    <Grid item md={2}>
                      <Typography className={classes.text}>
                        Type
                        <br />
                        {name}
                      </Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return <CircularProgress />;
    }
  }

  const mapStateToProps = (state) => ({
    favourites: state.favourites
  });
  
  const mapDispatchToProps = (dispatch) => ({
    toggleFavourite: (pokemon) => dispatch(toggleFavourite(pokemon)),
  });
  
  export default (
    connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)
  );
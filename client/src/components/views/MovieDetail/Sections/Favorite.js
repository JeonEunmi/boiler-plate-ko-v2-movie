import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Favorite(props) {

    const userFrom = props.userFrom;
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {
        
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('숫자 정보를 가져오는데 실패했습니다.')
                }
            })
            
            Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패했습니다.')
                }
            })

    }, [])

    const onClickFavorite = () => {
         
        // 이미 즐겨찾기 되어 있다면? remove
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if( response.data.success ) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.')
                    }
                })
                
            } else { // 즐겨찾기 add
                
                Axios.post('/api/favorite/addToFavorite', variables)
                    .then(response => {
                        if( response.data.success ) {
                            setFavoriteNumber(FavoriteNumber + 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Favorite 리스트에 추가하는 것을 실패했습니다.')
                        }
                    })
            }

     }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add  to Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite

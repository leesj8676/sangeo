import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from '../reviewcontent/reviewcontent.module.css';


class StarScore extends React.Component {
  state = {
    rating: 3
  }
 
  onStarClick(nextValue, prevValue, name) {
    console.log("@@@@");
    this.setState({rating: nextValue});
    this.props.onStarData(nextValue);
    
  }




 
 
  render() {
    const { rating } = this.state;

     return (                
      <div>
        <p>별점: {rating}</p>
        <StarRatingComponent 
          name="rate2" 
          starCount={5}
          renderStarIcon = {()=> <span>  <FontAwesomeIcon icon ={faStar} />  </span>}
          emptyStarColor={`#e2e2e2`}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />

      </div>
    );
  }
}
 
export default StarScore;
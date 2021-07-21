import React, {Component} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const widthData = (View, getData) => {

  return class All extends Component {
    
    state = {
      data: null,
      loader: true,
      error: false
    }

    componentDidMount() {
      getData()
          .then((data) => {
            this.setState({
              data,
              loader: false
            });
          })
          .catch(() => {
            this.onError();
          });
    }

    onError() {
      this.setState({
        error: true,
        loader: false
      })
    }

    render() {
      const {data, error, loader} = this.state;

      if (error) {
        return <ErrorMessage/>
      }
      
      if (loader) {
        return <Spinner/>
      }

      return <View {...this.props} data={data}/>;
    }
  }
};

export default widthData;
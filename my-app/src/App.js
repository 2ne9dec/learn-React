import React, { Component } from 'react';
import './App.scss';
import Car from './Car/Car';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Counter from './Counter/Counter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cars: [
        { name: 'Ford', year: 2018 },
        { name: 'Audi', year: 2016 },
        { name: 'Mazda', year: 2021 },
      ],
      pageTitle: 'React components',
      showCars: false,
    };
  }

  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars,
    });
  };

  onChangeName(name, index) {
    const car = this.state.cars[index];
    car.name = name;
    const cars = [...this.state.cars];
    cars[index] = car;

    this.setState({ cars });
  }

  deleteHandler(index) {
    const cars = this.state.cars.concat(); // 2 способ 25 строки
    cars.splice(index, 1);

    this.setState({ cars });
  }

  render() {
    const divStyle = {
      textAlign: 'center',
    };

    return (
      <div style={divStyle}>
        <h1>{this.props.title}</h1>

        <Counter />

        <hr />
        <button className={'AppButton'} onClick={this.toggleCarsHandler}>
          Toogle cars
        </button>

        <div
          style={{
            width: 400,
            margin: 'auto',
            paddingTop: '20px',
          }}
        >
          {this.state.showCars
            ? this.state.cars.map((car, index) => {
                return (
                  <ErrorBoundary key={index}>
                    <Car
                      name={car.name}
                      year={car.year}
                      onDelete={this.deleteHandler.bind(this, index)}
                      onChangeName={(event) =>
                        this.onChangeName(event.target.value, index)
                      }
                    />
                  </ErrorBoundary>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default App;

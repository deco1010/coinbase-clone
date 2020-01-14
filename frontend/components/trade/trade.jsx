import React from 'react';

class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbol: 'BTC',  //default to Bitcoin? this is what actually is sent in the order
            units: '',
            transaction_type: 'buy',
            name: 'Bitcoin', //default to Bitcoin? this is just for display purposes in the Trade Modal
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleOrderClick = this.handleOrderClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchCryptos(); //jbuilder filters out USD, but portfolio fetch may already have added USD to redux state
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleOrderClick(orderType) {
        return (e) => {
            let tradeTop = document.getElementsByClassName('trade-top');
            tradeTop[0].children[0].classList.remove('active');
            tradeTop[0].children[1].classList.remove('active');
            tradeTop[0].children[2].classList.remove('active');
            e.target.classList.add('active')
            this.setState({
                transaction_type: orderType 
            })
        }
    }

    handleClick(e) {
        this.props.closeModal();
        this.props.createTransaction(this.state)
    }

    coinModal() {
        // new modal of all cryptos
    }

    render() {
        let {transaction_type} = this.state;
        //check this.state.crypto which will be empty if the state hasn't been set yet
        // if (this.state.symbol === '') {
        //     return null;
        // }
        return (
            <div className='widget-trade'>
                <div className='trade-top'>
                    <div className='active' onClick={this.handleOrderClick("buy")}>Buy</div>
                    <div onClick={this.handleOrderClick("sell")}>Sell</div>
                    <div onClick={this.handleOrderClick("convert")}>Convert</div>
                </div>
                <div className='trade-middle'>
                    <input type="number" placeholder='0 units' minLength='1' onChange={this.update('units')
                        // onKeyPress={evt => evt.key === 'e' && evt.preventDefault()}
                    }/>
                    <div>
                        {/* {errors go here} */}
                    </div>
                    <div className='trade-crypto-selector'>
                        <p>
                            Buy
                        </p>
                        <div>
                            <div>
                                <img src={`window.${this.state.symbol}`} />
                            </div>
                            <p>
                                {this.state.name}
                            </p>
                        </div>
                    </div>
                    <button type='button' onClick={this.handleClick}>
                        {transaction_type.slice(0, 1).toUpperCase().concat(transaction_type.slice(1))} {this.state.name}
                    </button>
                </div>
                <div className='trade-bottom'>
                    {this.state.symbol} balance
                </div>
            </div>
        )
    }
}

export default Trade;
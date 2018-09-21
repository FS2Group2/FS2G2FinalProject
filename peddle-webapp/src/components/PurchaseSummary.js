import React, {Component, Fragment} from 'react';

class PurchaseSummary extends Component {

  totalAmount = () => {
    let eventCost = this.props.event.price || 0;
    let acCost = this.props.accommodation.price || 0;
    let ttCost = this.props.transferTo.price || 0;
    let tfCost = this.props.transferFrom.price || 0;

    return eventCost + acCost + ttCost + tfCost;
  };

  render() {
    const {event, accommodation, transferTo, transferFrom, purchase} = this.props;
    return (
        <Fragment>
          {!!event.name &&
          <div className='purchase-summary'>
            <div className="purchases">
              <p className='container-header-p'> Summary:</p>

              <div className="purchased-event">
                <div className='purchased-event-name summary-elem'>
                  <h3 className="purchased-event-header">{event.name}</h3>
                  <p>Location: {event.cityName}</p>
                </div>
                <div className="summary-elem">
                  {new Date(event.date).toLocaleString()}
                </div>
                <div className='summary-elem cost-elem'>
                  Cost: ${event.price}
                </div>
              </div>

              {accommodation.price && <div className="purchased-accommodation">
                <div className="summary-elem">
                  <p><span>Hotel: </span> {accommodation.name}</p>
                </div>
                <div className="summary-elem">
                  <p>{accommodation.minOrderTime/24} day(s)</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${accommodation.price}
                </div>
              </div>}

              {transferTo.price && <div className="purchased-transfer">
                <div className="summary-elem">
                  <p><span>Transfer to </span> {transferTo.toCityName}:</p>
                </div>
                <div className="summary-elem">
                  <p>{transferTo.transportTypeName} #{transferTo.number}</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${transferTo.price}
                </div>
              </div>}

              {transferFrom.price && <div className="purchased-transfer">
                <div className="summary-elem">
                  <p><span>Transfer from </span> {transferFrom.fromCityName}:</p>
                </div>
                <div className="summary-elem">
                  <p>{transferFrom.transportTypeName} #{transferFrom.number}</p>
                </div>
                <div className="summary-elem cost-elem">
                  Cost: ${transferFrom.price}
                </div>
              </div>}

            </div>

            <div className="summary">
              <p>Total amount:</p>
              <h3 className='purchase-summary-total'>${this.totalAmount()}</h3>
              <input className={'btn add-to-cart'} type="button" value={'Purchase'} onClick={()=>purchase()}/>
            </div>
          </div>
          }
        </Fragment>


    )
  }

}

export default PurchaseSummary;
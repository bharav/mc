import * as mocha from 'mocha';
import * as React from 'react';
import * as sinon from 'sinon';
import {assert, expect} from 'chai';
import {mount, render, shallow} from 'enzyme';
import McStock from '../components/McStock';



declare const sinon;

describe('<McStock />',() =>{
  const descTxt = "Testing Stock Details WEb part";
  let componentDidMountSpy;
  let renderedElement;
  let afterElement;
  var myItem= [            
                 {
                    "AssetName":"MasterCard",
                    "todaysPrice": 92.70,
                    "priceDifference":0.08,
                    "priceIncrease": false
                },

                {
                    "AssetName":"VISA",
                    "todaysPrice": 87.70,
                    "priceDifference":0.06,
                    "priceIncrease": true
                },

                {
                    "AssetName":"American Express",
                    "todaysPrice": 86.70,
                    "priceDifference":0.09,
                    "priceIncrease": false
                },
                {
                    "AssetName":"PayPal",
                    "todaysPrice": 80.70,
                    "priceDifference":0.05,
                    "priceIncrease": true
                }
            ];

  before(() => {
      componentDidMountSpy = sinon.spy(McStock.prototype, 'componentDidMount');
      renderedElement = mount(<McStock description={descTxt} />);
  });

  after (() => {
      componentDidMountSpy.restore();
  });

  ///TEst Cases are written here

  it('<SplistItems/> should render something div', () => {
      expect(renderedElement.find('div').find('')).to.be.exist;
  });

  it('<SplistItems/> should render something ul', () => {
      expect(renderedElement.find('ul').find('')).to.be.exist;
  });

  it('< SplistItems/> should call componentDidMount only once', () =>{
      expect(componentDidMountSpy.calledOnce).to.equal(true);
  });

  it('<SplistItems/> should render a div from JSON', () =>{
      expect(renderedElement.state('items')).to.be.an('array');      
  });

  it('<SplistItems/> count of UL LI', () =>{
      expect(renderedElement.find('li').length).to.be.not.null;
  });

  it('<SplistItems/> Check that the JSON returned is an Object', () =>{
     expect(renderedElement).to.be.an('object');
  });

  it('<SplistItems/> Check the fetched array is equal to the mock array for testing',(done) =>{
     setTimeout( () => {
         try{
            expect(renderedElement.state('items')).deep.equal(myItem);
            //expect(renderedElement.state('items')).should.include.something.that.deep.equals()
        // var elm = shallow(<SplistItems description={descTxt}/>).state('items').find('div').length;
        //     return expect(elm).to.eventually.be.an('array')
        //     .that.contains.something.with.property('AssetName','todaysPrice');
        //expect(renderedElement.state('items')).should.be.an('array').that.contains.something.with
            done();
         }
        catch(e){
            done(e);
        }
        
        
    }, 1000 );      
     
  });

  it('<SplistItems/> Check the fetched array members is equal to the mock array members for testing',(done) =>{
     setTimeout( () => {
         try{
            expect(renderedElement.state('items')).deep.members(myItem);
            //expect(renderedElement.state('items')).should.include.something.that.deep.equals()
        // var elm = shallow(<SplistItems description={descTxt}/>).state('items').find('div').length;
        //     return expect(elm).to.eventually.be.an('array')
        //     .that.contains.something.with.property('AssetName','todaysPrice');
        //expect(renderedElement.state('items')).should.be.an('array').that.contains.something.with
            done();
         }
        catch(e){
            done(e);
        }
        
        
    }, 1000 );      
     
  });

});
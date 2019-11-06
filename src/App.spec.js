import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Hook, {Counter, dataReducer} from './js/components/container/Hooks';
import axios from 'axios';

const list = ['a','b','c'];

const promise = new Promise((resolve, reject)  =>
    setTimeout(()=>
        resolve({
            data: {
                hits: [
                    {objectId:'1', title: 'a'},
                    {objectId:"1", title: 'b'}
                ]
            }
        }),
        100
    )
);



describe('Counter', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<Counter counter={1} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("App", ()=>{
    describe('Reducer', ()=>{
        it('should set a list', () => {
            const state = {list:[], error:null};
            const newState = dataReducer(state, {
                type: "SET_LIST",
                list: list,
            });
            expect(newState).toEqual({list: list, error: null});
        });
        it("Should reset the erro if the list is set", () => {
            const state = {list:[], error:true};
            const newState = dataReducer(state, {
                type:"SET_LIST",
                list: list,
            });
            expect(newState).toEqual({list:list, error:null})
        });
        it("Should test an error is being set", () => {
            const state = { list: [], error:null};
            const newState = dataReducer(state, {
                type: "SET_ERROR",
                error:true,
            });
            expect(newState.error).toEqual(true)
        });
    })
    describe("testing components", () =>{
        test('snapshot for App', ()=>{
            const component = renderer.create(<Hook/>);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        });
        it("Testing counter is being rendered", () => {
            const wrapper = mount(<Hook/>);
            expect(wrapper.find(Counter).length).toEqual(1);
        });
        it('Test all props are being passed', ()=>{
            const wrapper = mount(<Hook/>);
            const counterWrapper = wrapper.find(Counter);
            expect(counterWrapper.find('p').text()).toEqual('0')
        });
        it("Test the counter is incremented", ()=>{
            const wrapper = mount(<Hook/>);
            wrapper
                .find('button')
                .at(0)
                .simulate('click');
            const counterWrapper = wrapper.find(Counter);
            expect(counterWrapper.find('p').text()).toBe('1')
        });
        it("Test that decrements works", ()=>{
            const wrapper = mount(<Hook/>);
            wrapper
                .find('button')
                .at(1)
                .simulate('click');
            const counter = wrapper.find(Counter);
            expect(counter.find('p').text()).toBe('-1')
        });
        it("Ensure aync data is fetched", () =>{
            const wrapper = mount(<Hook/>);
            axios.get = jest.fn(()=>promise);
            expect(wrapper.find('li').length).toEqual(0);
            promise.then(()=>{
                setImmediate(()=>{
                    wrapper.update();
                    expect(wrapper.find('li').length).toEqual(2);
                    axios.get.mockClear();
                    done();
                })
            })
        })
    })
});
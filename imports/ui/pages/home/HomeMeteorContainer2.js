import React from "react";
import {Todos} from "../../../api/todos/todos";
import SimpleHome from './SimpleHome';
import {ReactMeteorContainer} from '../../HoC/ReactMeteorContainer';
import {Meteor} from "meteor/meteor";


const stateID = "todos-container2";
const subscribeKeys = ['tasks2'];

const listId = 2;

const getState = function () {
  return {
    todos: Todos.find({
      listId: listId,
    }).fetch(),
    handleInsert: (text) => Meteor.call('tasks.insert', text, listId),
    handleRemove: () => Meteor.call('tasks.removeAll', listId)
  };
};

export const HomeMeteorContainer2 = ReactMeteorContainer(stateID, subscribeKeys, getState)(SimpleHome);

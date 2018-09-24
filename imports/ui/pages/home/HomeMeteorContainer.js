import React from "react";
import {Todos} from "../../../api/todos/todos";
import SimpleHome from './SimpleHome';
import ReactMeteorContainer from '../../HoC/ReactMeteorContainer';
import {Meteor} from "meteor/meteor";


const stateID = "todos-container";
const subscribeKeys = ['tasks'];

const listId = 1;

const getState = function () {
  return {
    todos: Todos.find({
      listId: listId,
    }).fetch(),
    handleInsert: (text) => Meteor.call('tasks.insert', text, listId),
    handleRemove: () => Meteor.call('tasks.removeAll', listId)
  };
};

export const HomeMeteorContainer = ReactMeteorContainer({stateID, subscribeKeys, getState})(SimpleHome);

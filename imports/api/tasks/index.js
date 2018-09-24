import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import { Todos } from '../todos/todos';

if (Meteor.isServer) {
  Meteor.publish('tasks1', function tasksPublication() {
    return Todos.find({});
  });

  Meteor.publish('tasks2', function tasksPublication() {
    return Todos.find({});
  });
}

Meteor.methods({
  'tasks.insert'(message, listId) {
    check(message, String);
    check(listId, Number);

    Todos.insert({
      message,
      finished: false,
      listId: listId
    });
  },
  'tasks.removeAll'(listId) {
    check(listId, Number);
    Todos.remove({listId: listId});
  },

});

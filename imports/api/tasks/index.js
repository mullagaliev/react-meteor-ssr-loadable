import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import { Todos } from '../todos/todos';

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
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
  // 'tasks.remove'(taskId) {
  //   check(taskId, String);
  //
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can delete it
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.remove(taskId);
  // },
  'tasks.removeAll'(listId) {
    check(listId, Number);
    Todos.remove({listId: listId});
  },
  //
  // 'tasks.nameChange'(taskId, newName) {
  //   check(taskId, String);
  //   check(newName, String);
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can delete it
  //     throw new Meteor.Error('not-authorized');
  //   }
  //   Tasks.update(taskId, {$set: {text: newName}});
  // },
  //
  // 'tasks.setChecked'(taskId, setChecked) {
  //   check(taskId, String);
  //   check(setChecked, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //   if (task.private && task.owner !== this.userId) {
  //     // If the task is private, make sure only the owner can check it off
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, {$set: {checked: setChecked}});
  // },
  // 'tasks.setPrivate'(taskId, setToPrivate) {
  //   check(taskId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const task = Tasks.findOne(taskId);
  //
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Tasks.update(taskId, {$set: {private: setToPrivate}});
  // },
});

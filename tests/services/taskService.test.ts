import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { TaskService } from "@/lib/services/tasks/taskService";

describe('TaskService CRUD and State Management', () => {
  test('createTask creates a task with default open status and specified priority', async () => {
    const task = await TaskService.createTask({
      title: 'Shoot B-Roll Clip',
      description: 'Capture 4K 60fps coffee pouring shot',
      priority: 'HIGH',
      dueAt: new Date(Date.now() + 86400000).toISOString(),
    });

    assert.ok(task);
    assert.ok(task.id.startsWith('tsk_'));
    assert.equal(task.title, 'Shoot B-Roll Clip');
    assert.equal(task.priority, 'HIGH');
    assert.equal(task.status, 'OPEN');
  });

  test('updateTask updates task title, description, and priority', async () => {
    const task = await TaskService.createTask({
      title: 'Original Title',
      priority: 'LOW',
    });

    const updated = await TaskService.updateTask(task.id, {
      title: 'Edited Task Title',
      description: 'Added detailed notes',
      priority: 'HIGH',
    });

    assert.equal(updated.title, 'Edited Task Title');
    assert.equal(updated.description, 'Added detailed notes');
    assert.equal(updated.priority, 'HIGH');
  });

  test('toggleComplete toggles status between OPEN and COMPLETED', async () => {
    const task = await TaskService.createTask({
      title: 'Toggle Status Task',
      priority: 'MEDIUM',
    });
    assert.equal(task.status, 'OPEN');

    const completed = await TaskService.toggleComplete(task.id);
    assert.equal(completed.status, 'COMPLETED');
    assert.ok(completed.completedAt);

    const reopened = await TaskService.toggleComplete(task.id);
    assert.equal(reopened.status, 'OPEN');
  });
});

import ProperTimeClient from '../index';
import { Project } from '../models/project';
import { Task } from '../models/task';

let originalNumberOfTasks = 0;
let tasks: Task[] = [];
let selectedProject: Project | null = null;
let createdTask: Task | null = null;

let properTimeClient: ProperTimeClient;

describe('Tasks Service Tests', () => {
  beforeAll(() => {
    properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
  });

  test('Get tasks', async () => {
    tasks = await properTimeClient.tasks.list();
    originalNumberOfTasks = tasks.length;
  }, 10000);

  test('Select project', async () => {
    const firstProject = await properTimeClient.projects.list(undefined, 1);

    selectedProject = firstProject.length === 1 ? firstProject[0] : null;

    expect(selectedProject).toBeDefined();
  }, 10000);

  test('Create task', async () => {
    if (!selectedProject) {
      throw new Error('cannot run test - selectedProject is null');
    } else {
      createdTask = await properTimeClient.tasks.create({
        externalId: 'task1externalid',
        isAbsence: true,
        name: 'task1',
        projectId: selectedProject.id,
      });

      expect(createdTask).toHaveProperty('name', 'task1');
      expect(createdTask).toHaveProperty('project.id', selectedProject.id);
      expect(createdTask).toHaveProperty('isAbsence', true);
      expect(createdTask).toHaveProperty('externalId', 'task1externalid');
    }
  }, 10000);

  test('Patch task', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      createdTask = await properTimeClient.tasks.patch(createdTask.id, {
        externalId: 'task1externalid_patched',
      });

      expect(createdTask).toHaveProperty('name', 'task1');
      expect(createdTask).toHaveProperty('externalId', 'task1externalid_patched');
    }
  }, 10000);

  test('Get task again', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      const task = await properTimeClient.tasks.get(createdTask.id);

      expect(task).toBeDefined();
      expect(task).toHaveProperty('externalId', 'task1externalid_patched');
    }
  }, 10000);

  test('Delete task', async () => {
    if (!createdTask) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      const deleteResult = await properTimeClient.tasks.delete(createdTask.id);

      expect(deleteResult).toHaveProperty('id', createdTask.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});

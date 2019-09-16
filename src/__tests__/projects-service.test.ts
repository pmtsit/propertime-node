import ProperTimeClient from '../index';
import {IClient} from '../models/client';
import {IProject} from '../models/project';

let originalNumberOfProjects = 0;
let projects: IProject[] = [];
let selectedClient: IClient | null = null;
let createdProject: IProject | null = null;

const properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');

test('Get projects', async () => {

    projects = await properTimeClient.projects.list();
    originalNumberOfProjects = projects.length;
}, 10000);

test('Create client', async () => {
    const firstClient = (await properTimeClient.clients.list(undefined, 1));

    selectedClient = firstClient.length === 1 ? firstClient[0]: null;

    expect(selectedClient).toBeDefined();
}, 10000);

test('Create project', async () => {
    if (!selectedClient) {
        throw new Error('cannot run test - selectedClient is null');
    } else {
        createdProject = await properTimeClient.projects.create('project1', selectedClient.id, 'project1externalid');

        expect(createdProject).toHaveProperty('name', 'project1');
        expect(createdProject).toHaveProperty('client.id', selectedClient.id);
        expect(createdProject).toHaveProperty('external_id', 'project1externalid');
    }
}, 10000);

test('Get projects again', async () => {
    projects = await properTimeClient.projects.list();

    expect(projects).toHaveLength(originalNumberOfProjects + 1);
}, 10000);

test('Delete project', async () => {
    if (!createdProject) {
        throw new Error('cannot run test - createdProject is null');
    } else {
        const deleteResult = await properTimeClient.projects.delete(createdProject.id);

        expect(deleteResult).toHaveProperty('id', createdProject.id);
        expect(deleteResult).toHaveProperty('result', true);
    }
}, 10000);

test('Get projects again', async () => {
    projects = await properTimeClient.projects.list();

    expect(projects).toHaveLength(originalNumberOfProjects);
}, 10000);

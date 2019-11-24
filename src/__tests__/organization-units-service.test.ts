import ProperTimeClient from '../index';
import { OrganizationUnit } from '../models/organization-unit';

let originalNumberOfOrganizationUnits = 0;
let organizationUnits: OrganizationUnit[] = [];
let createdOrganizationUnit: OrganizationUnit | null = null;

let properTimeClient: ProperTimeClient;

describe('Organization Units Service Tests', () => {
  beforeAll(() => {
    properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
  });

  test('Get organizationUnits', async () => {
    organizationUnits = await properTimeClient.organizationUnits.list();
    originalNumberOfOrganizationUnits = organizationUnits.length;
  }, 10000);

  test('Create organization unit', async () => {
    createdOrganizationUnit = await properTimeClient.organizationUnits.create({
      name: 'organizationUnit1',
      unitNumber: '55',
    });

    expect(createdOrganizationUnit).toHaveProperty('name', 'organizationUnit1');
    expect(createdOrganizationUnit).toHaveProperty('unitNumber', '55');
  }, 10000);

  test('Patch organization unit', async () => {
    if (!createdOrganizationUnit) {
      throw new Error('cannot run test - createdOrganizationUnit is null');
    } else {
      createdOrganizationUnit = await properTimeClient.organizationUnits.patch(createdOrganizationUnit.id, {
        unitNumber: '77',
      });

      expect(createdOrganizationUnit).toHaveProperty('name', 'organizationUnit1');
      expect(createdOrganizationUnit).toHaveProperty('unitNumber', '77');
    }
  }, 10000);

  test('Get organization unit again', async () => {
    if (!createdOrganizationUnit) {
      throw new Error('cannot run test - createdOrganizationUnit is null');
    } else {
      const client = await properTimeClient.organizationUnits.get(createdOrganizationUnit.id);

      expect(client).toBeDefined();
      expect(client).toHaveProperty('unitNumber', '77');
    }
  }, 10000);

  test('Delete organization unit', async () => {
    if (!createdOrganizationUnit) {
      throw new Error('cannot run test - createdOrganizationUnit is null');
    } else {
      const deleteResult = await properTimeClient.organizationUnits.delete(createdOrganizationUnit.id);

      expect(deleteResult).toHaveProperty('id', createdOrganizationUnit.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});

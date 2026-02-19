import * as mapper from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('mapProjectFromApiToVm spec', () => {
  it('Should create empty project when input is null', () => {
    // Arrange
    const project: apiModel.Project = null;

    // Act
    const result: viewModel.Project = mapper.mapProjectFromApiToVm(project);
    const expectedEmptyProject: viewModel.Project =
      viewModel.createEmptyProject();

    // Assert
    expect(result).toEqual(expectedEmptyProject);
  });

  it('Should create empty project when input is undefined', () => {
    // Arrange
    const project: apiModel.Project = undefined;

    // Act
    const result: viewModel.Project = mapper.mapProjectFromApiToVm(project);
    const expectedEmptyProject: viewModel.Project =
      viewModel.createEmptyProject();

    // Assert
    expect(result).toEqual(expectedEmptyProject);
  });

  it('Should call createEmptyProject when input is null', () => {
    // Arrange
    const createEmptyProjectSpy = vi.spyOn(viewModel, 'createEmptyProject');
    const project: apiModel.Project = null;

    // Act
    mapper.mapProjectFromApiToVm(project);

    // Assert
    expect(createEmptyProjectSpy).toHaveBeenCalledOnce();
  });

  it('Should call createEmptyProject when input is undefined', () => {
    // Arrange
    const createEmptyProjectSpy = vi.spyOn(viewModel, 'createEmptyProject');
    const project: apiModel.Project = undefined;

    // Act
    mapper.mapProjectFromApiToVm(project);

    // Assert
    expect(createEmptyProjectSpy).toHaveBeenCalledOnce();
  });

  it('Should NOT call createEmptyProject when input is valid', () => {
    // Arrange
    const createEmptyProjectSpy = vi.spyOn(viewModel, 'createEmptyProject');
    const project: apiModel.Project = {
      id: '123',
      name: 'Project A',
      isActive: true,
      employees: [],
    };

    // Act
    mapper.mapProjectFromApiToVm(project);

    // Assert
    expect(createEmptyProjectSpy).not.toHaveBeenCalled();
    expect(project.id).toBe('123');
    expect(project.name).toBe('Project A');
    expect(project.isActive).toBe(true);
  });

  it('Should return empty employees array when input project has no employees', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '123',
      name: 'Project A',
      isActive: true,
      employees: [],
    };

    // Act
    const result: viewModel.Project = mapper.mapProjectFromApiToVm(project);

    // Assert
    expect(result.employees).toEqual([]);
  });

  it('Should map project with employees correctly', () => {
    // Arrange
    const employees: apiModel.EmployeeSummary[] = [
      {
        id: '1',
        isAssigned: true,
        employeeName: 'John Doe',
      },
      {
        id: '2',
        isAssigned: false,
        employeeName: 'Jane Smith',
      },
    ];

    const project: apiModel.Project = {
      id: '123',
      name: 'Project A',
      isActive: true,
      employees,
    };

    // Act
    const result: viewModel.Project = mapper.mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual({
      id: '123',
      name: 'Project A',
      isActive: true,
      employees: [
        {
          id: '1',
          isAssigned: true,
          employeeName: 'John Doe',
        },
        {
          id: '2',
          isAssigned: false,
          employeeName: 'Jane Smith',
        },
      ],
    });
  });
});

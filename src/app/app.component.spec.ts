import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { RobotService } from './robot/robot.service';

describe('AppComponent', () => {
  let mockedRobotService = jasmine.createSpyObj<RobotService>('RobotService', ['getInstructions', 'convertInstructions', 'isInTableBounds']);
  let app: AppComponent;
  const mockInstructions = [
    "PLACE -2,2,NORTH",
    "REPORT",
    "PLACE 1,0,SOUTH",
    "PLACE 2,4,NORTH",
    "RIGHT",
    "MOVE",
    "MOVE",
    "REPORT"
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: RobotService,
        useValue: mockedRobotService
      }],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    mockedRobotService.getInstructions = jasmine.createSpy().and.returnValue(of(mockInstructions));
    app = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(app).toBeTruthy();
  });

  it('Should have called the getInstructions method of the Robot Service', () => {
    app.getInstructions();
    expect(mockedRobotService.getInstructions).toHaveBeenCalled();
  });

  it('Should have a list of instructions in an array format', () => {
    app.getInstructions();
    expect(mockedRobotService.getInstructions).toHaveBeenCalled();
    expect(app.instructions.length).toBe(mockInstructions.length);
  });  
});

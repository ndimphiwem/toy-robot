import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RobotService } from './robot.service';
import { Robot } from '../types/robot-state';

describe('RobotService', () => {
  let service: RobotService;
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
  const mockRobot: Robot = {
    xPosition: -1,
    yPosition: -1,
    facingDirection: "EAST",
    report: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RobotService);
    
  });

  it('Robot Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should format text instructions array and return an array with an equal amount of actions', () => {
    const actions = service.convertInstructions(mockInstructions);
    expect(actions).toBeTruthy();
    expect(actions).toBeInstanceOf(Array);
    expect(actions.length).toEqual(mockInstructions.length);
  });

  it('Action PLACE -2,2,NORTH is not within the bounds of the table', () => {
    const firstAction = service.convertInstructions(mockInstructions)[0];
    const isWithinTable = service.isInTableBounds(Number(firstAction?.actionDetails?.xPosition), Number(firstAction?.actionDetails?.yPosition)); 
    expect(isWithinTable).toBeFalse();
  });

  it('Action PLACE 2,4,NORTH is within the bounds of the table', () => {
    const firstAction = service.convertInstructions(mockInstructions)[3];
    const isWithinTable = service.isInTableBounds(Number(firstAction?.actionDetails?.xPosition), Number(firstAction?.actionDetails?.yPosition)); 
    expect(isWithinTable).toBeTrue();
  });

  it('REPORT property on robot is false by default', () => {
    expect(service.robot.report).toBeFalse();
  });

  it('REPORT action will change the report property on the robot to true', () => {
    service.issueCommand({
      type: "REPORT",
      actionDetails: null
    });
    expect(service.robot.report).toBeTrue();
  });

  it('Turning left on EAST facing robot will make it face NORTH', () => {
    service.issueCommand({
      type: "LEFT",
      actionDetails: null
    });
    expect(service.robot.facingDirection).toBe("NORTH");
  });

  it('Turning right on EAST facing robot will make it face SOUTH', () => {
    service.issueCommand({
      type: "RIGHT",
      actionDetails: null
    });
    expect(service.robot.facingDirection).toBe("SOUTH");
  });
});

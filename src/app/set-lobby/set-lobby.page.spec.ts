import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLobbyPage } from './set-lobby.page';

describe('AddRoomPage', () => {
  let component: SetLobbyPage;
  let fixture: ComponentFixture<SetLobbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLobbyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLobbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetLobbyPage } from './set-lobby.page';

describe('SetLobbyPage', () => {
  let component: SetLobbyPage;
  let fixture: ComponentFixture<SetLobbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLobbyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetLobbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

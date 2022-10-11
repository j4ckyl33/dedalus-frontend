import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TextAnalyzerComponent } from './components/text-analyzer/text-analyzer.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TextAnalyzerComponent],
    }).compileComponents();
  });

  it('should create the app', () => {});
});

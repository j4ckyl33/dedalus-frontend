import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextAnalyzerComponent } from './text-analyzer.component';

describe('TextAnalyzerComponent', () => {
  let component: TextAnalyzerComponent;
  let fixture: ComponentFixture<TextAnalyzerComponent>;
  let button: HTMLElement;
  let pDebugArray: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAnalyzerComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAnalyzerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    component.formGroup.controls['userInput'].setValue('abce');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return vowel a and e in current output', () => {
    button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    pDebugArray = fixture.debugElement.queryAll(By.css('p'));
    expect(pDebugArray[0].nativeElement.innerHTML).toBe(
      ' The Letter a appears 1 times! '
    );
    expect(pDebugArray[1].nativeElement.innerHTML).toBe(
      ' The Letter e appears 1 times! '
    );
  });

  it('should return vowel a and e in previous output', () => {
    button = fixture.nativeElement.querySelector('button');
    button.click();
    button.click();
    fixture.detectChanges();
    pDebugArray = fixture.debugElement.queryAll(By.css('p'));
    expect(pDebugArray[2].nativeElement.innerHTML).toBe(
      ' The Letter a has appeared 1 times! '
    );
    expect(pDebugArray[3].nativeElement.innerHTML).toBe(
      ' The Letter e has appeared 1 times! '
    );
  });

  it('should return consonant b and c in current output', () => {
    component.formGroup.controls['typeToAnalyze'].setValue('consonants');
    button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    pDebugArray = fixture.debugElement.queryAll(By.css('p'));
    expect(pDebugArray[0].nativeElement.innerHTML).toBe(
      ' The Letter b appears 1 times! '
    );
    expect(pDebugArray[1].nativeElement.innerHTML).toBe(
      ' The Letter c appears 1 times! '
    );
  });

  it('should return consonant b and c in previous output', () => {
    component.formGroup.controls['typeToAnalyze'].setValue('consonants');
    button = fixture.nativeElement.querySelector('button');
    button.click();
    button.click();
    fixture.detectChanges();
    pDebugArray = fixture.debugElement.queryAll(By.css('p'));
    expect(pDebugArray[2].nativeElement.innerHTML).toBe(
      ' The Letter b has appeared 1 times! '
    );
    expect(pDebugArray[3].nativeElement.innerHTML).toBe(
      ' The Letter c has appeared 1 times! '
    );
  });

  it('should only return one character that is displayed', () => {
    component.formGroup.controls['userInput'].setValue('d1#+-/*!?@.,');
    fixture.detectChanges();
    component.formGroup.controls['typeToAnalyze'].setValue('consonants');
    button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    pDebugArray = fixture.debugElement.queryAll(By.css('p'));
    expect(pDebugArray.length).toBe(1);
  });
});

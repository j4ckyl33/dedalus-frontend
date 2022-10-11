import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'text-analyzer',
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.css'],
})
export class TextAnalyzerComponent implements OnInit {
  vowels: string = 'aeiou';
  consonants: string = 'bcdfghjklmnpqrstvwxyz';
  charLookingFor: string = '';
  formGroup: FormGroup = <FormGroup>{};
  prevLetterQuantityMap = new Map<string, number>();
  letterQuantityMap = new Map<string, number>();

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      typeToAnalyze: ['vowels'],
      userInput: ['', Validators.required],
      restToggle: [false],
    });
  }

  public onSubmit(): void {
    this.prevLetterQuantityMap = new Map(this.letterQuantityMap);
    this.letterQuantityMap.clear();
    let userInputString = this.formGroup
      .get('userInput')
      ?.value.replace(/[^a-zA-Z]/g, '')
      .toLowerCase();

    if (this.formGroup.get('restToggle')?.value) {
      this.restAnalyzer(userInputString);
    } else {
      this.offlineAnalyzer(userInputString);
    }
  }

  private offlineAnalyzer(userInputString: string): void {
    if (this.formGroup.get('typeToAnalyze')?.value === 'vowels') {
      this.charLookingFor = this.vowels;
    } else {
      this.charLookingFor = this.consonants;
    }
    for (let i = 0; i < userInputString.length; i++) {
      let currChar = userInputString.charAt(i);
      if (this.charLookingFor.includes(currChar)) {
        this.countLetters(currChar);
      }
    }
  }

  private countLetters(currChar: string): void {
    if (!this.letterQuantityMap.has(currChar)) {
      this.letterQuantityMap.set(currChar, 1);
      return;
    }
    let quantityOfVowel = this.letterQuantityMap.get(currChar) ?? -1;
    this.letterQuantityMap.set(currChar, quantityOfVowel + 1);
  }

  private restAnalyzer(userInputString: string): void {
    let postObject = {
      text: userInputString,
      type: this.formGroup.get('typeToAnalyze')?.value,
    };

    this.httpClient
      .post<any>('http://localhost:8090/analyze', postObject)
      .subscribe((response) => {
        this.letterQuantityMap = new Map(Object.entries(response));
      });
  }
}
